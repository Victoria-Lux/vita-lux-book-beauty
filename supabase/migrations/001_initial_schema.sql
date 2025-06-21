
-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create customers table
create table public.customers (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  first_name text not null,
  last_name text not null,
  phone text,
  referral_source text,
  auth_user_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create appointments table
create table public.appointments (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references public.customers(id) on delete cascade not null,
  service_name text not null,
  provider_name text not null,
  appointment_date date not null,
  appointment_time time not null,
  duration_minutes integer not null,
  price decimal(10,2) not null,
  status text default 'confirmed' check (status in ('confirmed', 'cancelled', 'completed')),
  special_preferences text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.customers enable row level security;
alter table public.appointments enable row level security;

-- Create RLS policies for customers
create policy "Users can view their own customer record" on public.customers
  for select using (auth.uid() = auth_user_id);

create policy "Users can insert their own customer record" on public.customers
  for insert with check (auth.uid() = auth_user_id);

create policy "Users can update their own customer record" on public.customers
  for update using (auth.uid() = auth_user_id);

-- Create RLS policies for appointments
create policy "Users can view their own appointments" on public.appointments
  for select using (
    customer_id in (
      select id from public.customers where auth_user_id = auth.uid()
    )
  );

create policy "Users can insert their own appointments" on public.appointments
  for insert with check (
    customer_id in (
      select id from public.customers where auth_user_id = auth.uid()
    )
  );

create policy "Users can update their own appointments" on public.appointments
  for update using (
    customer_id in (
      select id from public.customers where auth_user_id = auth.uid()
    )
  );

-- Create function to handle user registration
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.customers (auth_user_id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user registration
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
