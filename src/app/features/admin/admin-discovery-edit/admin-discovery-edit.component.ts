import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { DiscoveriesService } from '../../../services/discoveries.service';
import { Discovery } from '../../../models/discovery.model';

@Component({
  selector: 'app-admin-discovery-edit',
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-discovery-edit.component.html',
  styleUrl: './admin-discovery-edit.component.css',
})
export class AdminDiscoveryEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private discoveriesService = inject(DiscoveriesService);
  private storage = inject(Storage);

  id: string | null = null;
  saving = signal(false);
  uploadingThumb = signal(false);
  uploadingGallery = signal(false);
  thumbUploadProgress = signal(0);
  galleryUploadProgress = signal(0);

  form: Discovery = {
    title: '',
    link: '',
    imgPath: '',
    content: '',
    textTitle: '',
    paragraphs: [],
    imgs: [],
    order: 0,
  };

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id && this.id !== 'new') {
      this.discoveriesService.getDiscoveries().subscribe((list) => {
        const found = list.find((d) => d.id === this.id);
        if (found) {
          this.form = {
            ...found,
            paragraphs: [...(found.paragraphs ?? [])],
            imgs: [...(found.imgs ?? [])],
          };
        }
      });
    }
  }

  // --- Paragraphs ---
  addParagraph(): void { this.form.paragraphs = [...(this.form.paragraphs ?? []), '']; }
  removeParagraph(i: number): void { this.form.paragraphs!.splice(i, 1); }
  trackByIndex(i: number): number { return i; }
  updateParagraph(i: number, value: string): void { this.form.paragraphs![i] = value; }

  // --- Gallery images ---
  addImg(): void { this.form.imgs = [...(this.form.imgs ?? []), '']; }
  removeImg(i: number): void { this.form.imgs!.splice(i, 1); }
  updateImg(i: number, value: string): void { this.form.imgs![i] = value; }

  // --- Upload thumbnail ---
  async onThumbUpload(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploadingThumb.set(true);
    const url = await this.uploadFile(file, `discoveries/${Date.now()}_${file.name}`, this.thumbUploadProgress);
    this.form.imgPath = url;
    this.uploadingThumb.set(false);
  }

  // --- Upload gallery image ---
  async onGalleryUpload(event: Event): Promise<void> {
    const files = (event.target as HTMLInputElement).files;
    if (!files) return;
    this.uploadingGallery.set(true);
    for (const file of Array.from(files)) {
      const url = await this.uploadFile(file, `discoveries/${Date.now()}_${file.name}`, this.galleryUploadProgress);
      this.form.imgs = [...(this.form.imgs ?? []), url];
    }
    this.uploadingGallery.set(false);
  }

  private uploadFile(file: File, path: string, progress: ReturnType<typeof signal<number>>): Promise<string> {
    return new Promise((resolve, reject) => {
      const storageRef = ref(this.storage, path);
      const task = uploadBytesResumable(storageRef, file);
      task.on(
        'state_changed',
        (snap) => progress.set(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
        reject,
        async () => resolve(await getDownloadURL(task.snapshot.ref))
      );
    });
  }

  async save(): Promise<void> {
    this.saving.set(true);
    const data: Discovery = {
      ...this.form,
      paragraphs: (this.form.paragraphs ?? []).filter((p) => p.trim() !== ''),
      imgs: (this.form.imgs ?? []).filter((img) => img.trim() !== ''),
    };
    try {
      if (this.id && this.id !== 'new') {
        await this.discoveriesService.update(this.id, data);
      } else {
        await this.discoveriesService.add(data);
      }
      this.router.navigate(['/admin/discoveries']);
    } finally {
      this.saving.set(false);
    }
  }
}
