import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


function Product({ image, title, price, addToCart }) {
  //Función para amanejar el evento de agregar al carrito
  const handleAddToCart = () => {
    // Lógica para agregar el producto al carrito
    const product = {
      image,
      title,
      price,
    };
    addToCart(product);
  };

  return (
    <Card sx={{ display: 'flex', border: '1px solid #ccc', borderRadius: '4px', padding: '10px', marginBottom: '10px' }}>
      <CardMedia
        component="img"
        sx={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', marginRight: '10px' }}
        image={image}
        alt="Product Image"
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h5" component="div" sx={{ margin: 0 }}>{title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ margin: 0, marginBottom: '10px' }}>{price}</Typography>

      </CardContent>
    </Card>
  );
}
export { Product };