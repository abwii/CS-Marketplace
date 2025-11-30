import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { MarketService } from '../../services/market';
import { SkinService } from '../../services/skin';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})
export class InventoryComponent implements OnInit {
  inventory: any[] = [];
  message = '';
  allSkins: any[] = [];

  constructor(
    private authService: AuthService,
    private marketService: MarketService,
    private skinService: SkinService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadInventory();
    this.skinService.getSkins().subscribe(skins => {
      this.allSkins = Object.values(skins).filter((s: any) => s.image);
    });
  }

  loadInventory() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.inventory = user.inventory;
      }
    });
  }

  sell(skinId: string) {
    const priceStr = prompt('Enter price to sell:');
    if (!priceStr) return;
    const price = parseFloat(priceStr);
    if (isNaN(price) || price <= 0) {
      alert('Invalid price');
      return;
    }

    this.marketService.sellItem(skinId, price).subscribe({
      next: () => {
        this.message = 'Item listed for sale!';
        this.authService.loadUser();
        setTimeout(() => this.message = '', 3000);
      },
      error: (err) => {
        this.message = err.error.msg || 'Failed to list item';
        setTimeout(() => this.message = '', 3000);
      }
    });
  }

  addRandomSkin() {
    if (this.allSkins.length === 0) return;
    const randomSkin = this.allSkins[Math.floor(Math.random() * this.allSkins.length)];

    const skinToAdd = {
      name: randomSkin.name,
      image: randomSkin.image,
      rarity: randomSkin.rarity ? randomSkin.rarity.name : 'Common',
      rarity_color: randomSkin.rarity ? randomSkin.rarity.color : '#b0c3d9',
      float: Math.random(),
      pattern: Math.floor(Math.random() * 1000)
    };

    const token = this.authService.getToken();
    this.http.post('http://localhost:5000/api/user/inventory/add', { skin: skinToAdd }, {
      headers: { 'x-auth-token': token || '' }
    }).subscribe({
      next: () => {
        this.message = 'New skin added!';
        this.authService.loadUser();
        setTimeout(() => this.message = '', 3000);
      },
      error: (err) => console.error(err)
    });
  }
}
