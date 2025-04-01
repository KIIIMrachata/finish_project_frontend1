// frontend.js
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

// ตั้งค่า EJS เป็น view engine และกำหนด path สำหรับ views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware สำหรับ parse form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ถ้ามีไฟล์ static (CSS, JS, รูปภาพ) ให้กำหนดโฟลเดอร์ public
app.use(express.static(path.join(__dirname, 'public')));

// =====================
// Frontend Routes สำหรับ render หน้าเว็บ
// =====================

// หน้าแรก (เมนูหลัก)
app.get('/', (req, res) => {
  res.render('index');
});

// หน้า Customers
app.get('/customers', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/customers');
    const customers = response.data;
    res.render('customers', { customers });
  } catch (err) {
    res.send(err.message);
  }
});

// หน้าแบบฟอร์มเพิ่ม Customer (newCustomer.ejs ควรมีอยู่ใน views)
app.get('/customers/new', (req, res) => {
  res.render('newCustomer');
});

// จัดการเพิ่ม Customer เมื่อส่งแบบฟอร์ม
app.post('/customers', async (req, res) => {
  try {
    await axios.post('http://localhost:3000/api/customers', req.body);
    res.redirect('/customers');
  } catch (err) {
    res.send(err.message);
  }
});


// หน้าแบบฟอร์มเพิ่ม Product (newProduct.ejs ควรมีอยู่ใน views)
app.get('/products/new', (req, res) => {
    res.render('newProduct');
  });
  
  // จัดการเพิ่ม Product เมื่อส่งแบบฟอร์ม
  app.post('/products', async (req, res) => {
    try {
      await axios.post('http://localhost:3000/api/products', req.body);
      res.redirect('/products');
    } catch (err) {
      res.send(err.message);
    }
  });
  


app.post('/orders', async (req, res) => {
    try {
      await axios.post('http://localhost:3000/api/orders', req.body);
      res.redirect('/orders');
    } catch (err) {
      res.send(err.message);
    }
  });



app.post('/orderItems', async (req, res) => {
    try {
      await axios.post('http://localhost:3000/api/orderItems', req.body);
      res.redirect('/orderItems');
    } catch (err) {
      res.send(err.message);
    }
  });
  



// แสดงฟอร์มแก้ไข Product
app.get('/products/edit/:id', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      const products = response.data;
      const product = products.find(p => p.id == req.params.id);
      if (product) {
        res.render('editProduct', { product });
      } else {
        res.send('Product not found');
      }
    } catch (err) {
      res.send(err.message);
    }
  });
  


  // จัดการแก้ไข Product เมื่อส่งแบบฟอร์ม
app.post('/products/edit/:id', async (req, res) => {
    try {
      await axios.put(`http://localhost:3000/api/products/${req.params.id}`, req.body);
      res.redirect('/products');
    } catch (err) {
      res.send(err.message);
    }
  });
  

  app.post('/products/delete/:id', async (req, res) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${req.params.id}`);
      res.redirect('/products');
    } catch (err) {
      res.send(err.message);
    }
  });
  

  // แสดงฟอร์มแก้ไข Order
app.get('/orders/edit/:id', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:3000/api/orders');
      const orders = response.data;
      const order = orders.find(o => o.id == req.params.id);
      if (order) {
        res.render('editOrder', { order });
      } else {
        res.send('Order not found');
      }
    } catch (err) {
      res.send(err.message);
    }
  });
  


  // จัดการแก้ไข Order เมื่อส่งแบบฟอร์ม
app.post('/orders/edit/:id', async (req, res) => {
    try {
      await axios.put(`http://localhost:3000/api/orders/${req.params.id}`, req.body);
      res.redirect('/orders');
    } catch (err) {
      res.send(err.message);
    }
  });
  

  app.post('/orders/delete/:id', async (req, res) => {
    try {
      await axios.delete(`http://localhost:3000/api/orders/${req.params.id}`);
      res.redirect('/orders');
    } catch (err) {
      res.send(err.message);
    }
  });
  



  // แสดงฟอร์มแก้ไข Order Item
app.get('/orderItems/edit/:id', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:3000/api/orderItems');
      const orderItems = response.data;
      const orderItem = orderItems.find(oi => oi.id == req.params.id);
      if (orderItem) {
        res.render('editOrderItem', { orderItem });
      } else {
        res.send('Order Item not found');
      }
    } catch (err) {
      res.send(err.message);
    }
  });
  


  // จัดการแก้ไข Order Item เมื่อส่งแบบฟอร์ม
app.post('/orderItems/edit/:id', async (req, res) => {
    try {
      await axios.put(`http://localhost:3000/api/orderItems/${req.params.id}`, req.body);
      res.redirect('/orderItems');
    } catch (err) {
      res.send(err.message);
    }
  });
  


  app.post('/orderItems/delete/:id', async (req, res) => {
    try {
      await axios.delete(`http://localhost:3000/api/orderItems/${req.params.id}`);
      res.redirect('/orderItems');
    } catch (err) {
      res.send(err.message);
    }
  });
  


// หน้าแก้ไข Customer
app.get('/customers/edit/:id', async (req, res) => {
  try {
    // สมมติว่ามี API สำหรับดึงข้อมูลลูกค้าแต่ละคน
    const response = await axios.get('http://localhost:3000/api/customers');
    const customers = response.data;
    const customer = customers.find(c => c.id == req.params.id);
    if (customer) {
      res.render('editCustomer', { customer });
    } else {
      res.send('Customer not found');
    }
  } catch (err) {
    res.send(err.message);
  }
});

// จัดการแก้ไข Customer
app.post('/customers/edit/:id', async (req, res) => {
  try {
    await axios.put(`http://localhost:3000/api/customers/${req.params.id}`, req.body);
    res.redirect('/customers');
  } catch (err) {
    res.send(err.message);
  }
});

// ลบ Customer
app.post('/customers/delete/:id', async (req, res) => {
  try {
    await axios.delete(`http://localhost:3000/api/customers/${req.params.id}`);
    res.redirect('/customers');
  } catch (err) {
    res.send(err.message);
  }
});

// หน้า Products
app.get('/products', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/products');
    const products = response.data;
    res.render('products', { products });
  } catch (err) {
    res.send(err.message);
  }
});

// หน้า Orders
app.get('/orders', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/orders');
    const orders = response.data;
    res.render('orders', { orders });
  } catch (err) {
    res.send(err.message);
  }
});

// หน้า Order Items
app.get('/orderItems', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/orderItems');
    const orderItems = response.data;
    res.render('orderItems', { orderItems });
  } catch (err) {
    res.send(err.message);
  }
});

// หน้า Report Dashboard
app.get('/report', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/report/summary');
    const summary = response.data;
    res.render('report', summary);
  } catch (err) {
    res.send(err.message);
  }
});

// หน้า Daily Report
app.get('/report/daily', async (req, res) => {
  try {
    const monthYear = req.query.monthYear || new Date().toISOString().substring(0,7);
    const response = await axios.get(`http://localhost:3000/api/report/daily?monthYear=${monthYear}`);
    const dailyReports = response.data;
    res.render('dailyReport', { dailyReports, monthYear });
  } catch (err) {
    res.send(err.message);
  }
});

// หน้า Today Report
app.get('/report/today', async (req, res) => {
  try {
    const chosenDate = req.query.date || new Date().toISOString().split('T')[0];
    const response = await axios.get(`http://localhost:3000/api/report/today?date=${chosenDate}`);
    const todayReport = response.data;
    res.render('todayReport', { ordersToday: todayReport.orders, today: todayReport.date });
  } catch (err) {
    res.send(err.message);
  }
});

// =====================
// เริ่มเซิร์ฟเวอร์ Frontend
// =====================
const FRONTEND_PORT = process.env.FRONTEND_PORT || 5500;
app.listen(FRONTEND_PORT, () => {
  console.log(`Frontend server running on port ${FRONTEND_PORT}`);
});
