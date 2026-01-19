-- Create orders table for WhatsApp bookings
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT,
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  whatsapp_message_sent BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at DESC);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for authenticated users (admins)
CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create policy for admins to update orders
CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  USING (auth.role() = 'authenticated');
