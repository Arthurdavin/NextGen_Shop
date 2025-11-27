'use client';

import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/lib/store';

export default function OrderConfirmationPage() {
  const { user } = useAuth();
  const orderId = `ORD-${Date.now()}`;
  const orderDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <CheckCircle className="mx-auto mb-6 text-green-500" size={64} />
        
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-6">Thank you for your purchase, {user?.name}</p>
        
        <div className="bg-card border border-border rounded-lg p-6 mb-6 text-left space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="font-mono font-bold text-lg">{orderId}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Order Date</p>
            <p className="font-semibold">{orderDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Estimated Delivery</p>
            <p className="font-semibold">3-5 Business Days</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Shipping to</p>
            <p className="font-semibold">{user?.email}</p>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-8 text-sm">
          A confirmation email has been sent to your email address. You can track your order status at any time.
        </p>
        
        <Link href="/" className="w-full block">
          <Button className="w-full bg-accent hover:bg-accent/90">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
