'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart, useAuth } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { items, getCartSubtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  
  const subtotal = getCartSubtotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = Math.round(subtotal * 0.1 * 100) / 100;
  const total = subtotal + shipping + tax;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle size={48} className="mx-auto text-destructive mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Login Required</h1>
          <p className="text-muted-foreground mb-6">Please login to complete your purchase.</p>
          <Link href="/login">
            <Button className="bg-accent hover:bg-accent/90">Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No items in cart</h1>
          <Link href="/">
          <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground flex items-center gap-2 px-4 py-2">
            <ArrowLeft size={18} />
            Back to Home
          </Button>
        </Link>
        </div>
      </div>
    );
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearCart();
    router.push('/order-confirmation');
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border px-4 py-4 md:px-8">
        <Link href="/cart" className="text-muted-foreground hover:text-foreground transition">  
          <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground flex items-center gap-2">
            <ArrowLeft size={18} />
            Back to Card
          </Button>
        </Link>
      </nav>
      
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="col-span-1 px-4 py-2 bg-secondary border border-border rounded text-foreground placeholder-muted-foreground"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="col-span-1 px-4 py-2 bg-secondary border border-border rounded text-foreground placeholder-muted-foreground"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="col-span-2 px-4 py-2 bg-secondary border border-border rounded text-foreground placeholder-muted-foreground"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="col-span-2 px-4 py-2 bg-secondary border border-border rounded text-foreground placeholder-muted-foreground"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="col-span-2 px-4 py-2 bg-secondary border border-border rounded text-foreground placeholder-muted-foreground"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="col-span-1 px-4 py-2 bg-secondary border border-border rounded text-foreground placeholder-muted-foreground"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="col-span-1 px-4 py-2 bg-secondary border border-border rounded text-foreground placeholder-muted-foreground"
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="Zip Code"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="col-span-2 px-4 py-2 bg-secondary border border-border rounded text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-secondary border border-border rounded text-foreground placeholder-muted-foreground"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleChange}
                      required
                      className="px-4 py-2 bg-secondary border border-border rounded text-foreground placeholder-muted-foreground"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                      className="px-4 py-2 bg-secondary border border-border rounded text-foreground placeholder-muted-foreground"
                    />
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground py-3 text-lg font-semibold"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </Button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="bg-card border border-border rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4 pb-4 border-b border-border max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.title} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-destructive">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
