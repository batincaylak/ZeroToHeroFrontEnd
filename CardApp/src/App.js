// import logo from "./logo.svg";
import { Grid, Container, Button, Input, Textarea, Stack } from '@mantine/core';
import "./App.css";
import Card from "./components/Card";
import { useState } from "react";

// const kare = (sayi) => sayi * sayi;

const App = () => {

  const [title, setTitle] = useState("");
  const [paragraf, setParagraph] = useState("");
  const [list, setList] = useState([
    {
      id: 1,
      title: "Dağ 1",
      par: "Açıklama 1",
    },
    {
      id: 2,
      title: "Dağ 2",
      par: "Açıklama 2",
    },
    {
      id: 3,
      title: "Dağ 3",
      par: "Açıklama 3",
    },
  ]);
  const click = () => {
    setTitle("");
    setParagraph("");
    setList([
        ...list,
        {
          id:5,
          title,
          par: paragraf,
        },
      ]);
  }
  return (
    <Container>
      <h1>Kart oluşturma programi</h1>
      <Stack>
      <Input.Wrapper label="Başlık"> 
      <Input placeholder="Başlık yazınız." value={title} onChange={(e)=> setTitle(e.target.value)}/>
      </Input.Wrapper>
      <Textarea
      placeholder="Paragraf yazınız"
      label="Paragraf"
      value={paragraf}
      onChange={(e)=> setParagraph(e.target.value)}
    />
      <Button variant="outline" onClick={click}>Kart oluştur</Button>
      </Stack>
      <h2>Kartlar:</h2>
      <Grid>
        {list.map(({ id, title, par }, i) => (
         <Grid.Col span={4} key={`index ${i}`}>
            <Card 
            par={par} 
            title={title} 
            index={i} 
            click={()=>{
              let copyList = [...list];
              copyList.splice(i, 1);
              setList(copyList);
              console.log("Dışarıdan tıklanıldı.");
            }}/>
         </Grid.Col>
        
        ))}
      </Grid>
    </Container>
  );
};

export default App;
