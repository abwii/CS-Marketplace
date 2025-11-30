import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marketplace.html',
  styleUrls: ['./marketplace.css']
})
export class MarketplaceComponent implements OnInit {
  items: any[] = [];
  message = '';

  constructor(private marketService: MarketService, public authService: AuthService) { }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.marketService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  buy(id: string) {
    if (!confirm('Are you sure you want to buy this item?')) return;

    this.marketService.buyItem(id).subscribe({
      next: (res) => {
        this.message = 'Item purchased successfully!';
        this.loadItems();
        this.authService.loadUser();
        setTimeout(() => this.message = '', 3000);
      },
      error: (err) => {
        this.message = err.error.msg || 'Purchase failed';
        setTimeout(() => this.message = '', 3000);
      }
    });
  }
}
