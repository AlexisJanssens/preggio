import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { GalleriesService } from '../../../services/galleries.service';
import { Gallery } from '../../../models/gallery.model';

@Component({
  selector: 'app-admin-gallery-edit',
  imports: [RouterLink],
  templateUrl: './admin-gallery-edit.component.html',
  styleUrl: './admin-gallery-edit.component.css',
})
export class AdminGalleryEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private galleriesService = inject(GalleriesService);
  private storage = inject(Storage);

  galleryId = '';
  gallery = signal<Gallery | null>(null);
  images = signal<string[]>([]);
  namedImages = signal<{ [key: string]: string }>({});

  saving = signal(false);
  uploading = signal(false);
  uploadProgress = signal(0);

  readonly namedKeys = ['pepe', 'scuola', 'situation'];

  get isNamedGallery(): boolean {
    return this.galleryId === 'home-vignettes';
  }

  ngOnInit(): void {
    this.galleryId = this.route.snapshot.paramMap.get('id') ?? '';
    this.galleriesService.getGalleryDoc(this.galleryId).subscribe((g) => {
      if (g) {
        this.gallery.set(g);
        this.images.set([...(g.images ?? [])]);
        this.namedImages.set({ ...(g.namedImages ?? {}) });
      }
    });
  }

  // --- Ordered image list ---
  moveUp(i: number): void {
    const imgs = [...this.images()];
    if (i === 0) return;
    [imgs[i - 1], imgs[i]] = [imgs[i], imgs[i - 1]];
    this.images.set(imgs);
  }

  moveDown(i: number): void {
    const imgs = [...this.images()];
    if (i === imgs.length - 1) return;
    [imgs[i], imgs[i + 1]] = [imgs[i + 1], imgs[i]];
    this.images.set(imgs);
  }

  removeImage(i: number): void {
    const imgs = [...this.images()];
    imgs.splice(i, 1);
    this.images.set(imgs);
  }

  // --- Named images (home-vignettes) ---
  removeNamedImage(key: string): void {
    const named = { ...this.namedImages() };
    named[key] = '';
    this.namedImages.set(named);
  }

  // --- Upload for ordered gallery ---
  async onUpload(event: Event): Promise<void> {
    const files = (event.target as HTMLInputElement).files;
    if (!files) return;
    this.uploading.set(true);
    for (const file of Array.from(files)) {
      const url = await this.uploadFile(file, `galleries/${this.galleryId}/${Date.now()}_${file.name}`);
      this.images.set([...this.images(), url]);
    }
    this.uploading.set(false);
  }

  // --- Upload for named image ---
  async onNamedUpload(event: Event, key: string): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploading.set(true);
    const url = await this.uploadFile(file, `galleries/${this.galleryId}/${Date.now()}_${file.name}`);
    this.namedImages.set({ ...this.namedImages(), [key]: url });
    this.uploading.set(false);
  }

  private uploadFile(file: File, path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const storageRef = ref(this.storage, path);
      const task = uploadBytesResumable(storageRef, file);
      task.on(
        'state_changed',
        (snap) => this.uploadProgress.set(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
        reject,
        async () => resolve(await getDownloadURL(task.snapshot.ref))
      );
    });
  }

  async save(): Promise<void> {
    this.saving.set(true);
    try {
      if (this.isNamedGallery) {
        await this.galleriesService.updateGalleryDoc(this.galleryId, {
          namedImages: this.namedImages(),
        });
      } else {
        await this.galleriesService.updateImages(this.galleryId, this.images());
      }
    } finally {
      this.saving.set(false);
    }
  }

  trackByIndex(i: number): number {
    return i;
  }
}
