const categoryRoutes = require('./routes/category.routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use('/api/categories', categoryRoutes);
// ...les altres rutes...
app.use(errorHandler); // sempre l'últim