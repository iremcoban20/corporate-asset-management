-- Create Departments Table
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Create Employees Table
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    department_id INT REFERENCES departments(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Asset Categories Table
CREATE TABLE IF NOT EXISTS asset_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE, -- e.g., Laptop, Monitor, Vehicle
    description TEXT
);

-- Create Assets Table
CREATE TYPE asset_status AS ENUM ('AVAILABLE', 'ASSIGNED', 'MAINTENANCE', 'RETIRED');

CREATE TABLE IF NOT EXISTS assets (
    id SERIAL PRIMARY KEY,
    serial_number VARCHAR(100) UNIQUE NOT NULL,
    category_id INT REFERENCES asset_categories(id),
    brand VARCHAR(100),
    model VARCHAR(100),
    purchase_date DATE,
    status asset_status DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Asset Assignments Table (Track History)
CREATE TABLE IF NOT EXISTS asset_assignments (
    id SERIAL PRIMARY KEY,
    asset_id INT NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
    employee_id INT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    assigned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_date TIMESTAMP, -- NULL implies currently active assignment
    notes TEXT,
    CONSTRAINT check_return_date CHECK (return_date IS NULL OR return_date >= assigned_date)
);

-- Indexes for performance
CREATE INDEX idx_assets_category ON assets(category_id);
CREATE INDEX idx_assets_status ON assets(status);
CREATE INDEX idx_assignments_asset ON asset_assignments(asset_id);
CREATE INDEX idx_assignments_employee ON asset_assignments(employee_id);

-- Insert some default categories
INSERT INTO asset_categories (name, description) VALUES
('Laptop', 'Portable computers'),
('Monitor', 'External display screens'),
('Phone', 'Mobile phones'),
('Software License', 'Digital licenses for software'),
('Vehicle', 'Company cars');

-- Insert some dummy departments
INSERT INTO departments (name) VALUES
('IT'),
('HR'),
('Sales'),
('Operations');
