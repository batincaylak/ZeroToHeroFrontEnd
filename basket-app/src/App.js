import {useState} from 'react';
import { 
   Button, 
   Badge,
   Container, 
   Drawer, 
   Group, 
   List, 
   Input,
   Indicator, 
   SimpleGrid
  } from '@mantine/core';
import Card from "./components/Card";
import './App.css';


const storeItems = [
  {
    id: 100,
    name: "Fotoğraf Makinesi",
    src: "camera",
    price: "20"
  },
  {
    id: 101,
    name: "Kulaklık",
    src: "headphone",
    price: "10"
  },
  {
    id: 102,
    name: "Samsung Akıllı Saat",
    src: "watch-2",
    price: "25"
  },
  {
    id: 103,
    name: "Retro Fotoğraf Makinesi",
    src: "retro-camera",
    price: "25"
  },
  {
    id: 104,
    name: "Oyuncak Araba",
    src: "toy-car",
    price: "25"
  },
  {
    id: 105,
    name: "Kol Saati",
    src: "watch",
    price: "25"
  }
];



function App() {
let [opened, setOpened] = useState(false);
let [basketItems, setBasketItems] = useState([]); // useState ile basketItems değişkeni oluşturduk ve bunun başlangıç değeri boş bir array olarak belirledik
let [searchValue, setSearchValue] = useState(""); // useState ile search değişkeni oluşturduk ve bunun başlangıç değeri boş bir string olarak belirledik
let filteredItems = storeItems.filter(  
  (item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  ); 
  let addToBasket = ({ id, name }) => {
  let basketIndex =  basketItems.findIndex(item => item.id === id);
    if (basketIndex >= 0) {
      let _basketItems = [...basketItems];
      _basketItems[basketIndex].count += 1;
      setBasketItems(_basketItems)
      } else {
      setBasketItems ([...basketItems, { id, name, count: 1 }])
    }
  }

  return (
    <Container>
    <Group align="end"> 
      <Input.Wrapper label="Arama">
        <Input value={searchValue} onChange= {(e)=> setSearchValue(e.target.value)} />
      </Input.Wrapper>
       <Button onClick={() => setSearchValue("")}>Temizle</Button>
       <Indicator color="red" size={22} label={basketItems.length}>
        <Button onClick={() => setOpened(true)}>Sepet</Button>
       </Indicator>
    </Group>
    <SimpleGrid cols={3} className='Store'>
     {filteredItems.map(({ id, name, src }) => {
      return (  
        <Card 
        key={name} 
        name = {name} 
        src = {src}
        onAdd={() => addToBasket({ id, name})} // bir nesneyi map ile döndürürken unique key vermek zorundayız
        />
      );
    })}
    </SimpleGrid>
    <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="SEPETİM"
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        <List listStyleType="disc" className='List'>
      {basketItems.map(({ name, count }, index) => (
        <List.Item key={index}>
          <SimpleGrid cols={2}>
          <div>{name}</div> <Badge>{count}</Badge>  
          </SimpleGrid>
        </List.Item>
      ))}
    </List>
      </Drawer>
    </Container>
  );
}

export default App;
