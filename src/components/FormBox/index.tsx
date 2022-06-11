import React from "react";
import firestore from "@react-native-firebase/firestore";

import { Container } from "./styles";
import { ButtonIcon } from "../ButtonIcon";
import { Input } from "../Input";
import { Alert } from "react-native";

export function FormBox() {
  const [description, setDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);

  async function handleAddproduct() {
    firestore()
      .collection("products")
      .add({
        description,
        quantity,
      })
      .then(() => {
        setDescription("");
        setQuantity(0);
        Alert.alert("Produto adicionado com sucesso!");
      })
      .catch(() => {
        Alert.alert("Erro ao adicionar produto!");
      });
  }

  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        onChangeText={setDescription}
      />
      <Input
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{ marginHorizontal: 8 }}
        onChangeText={(value) => setQuantity(Number(value))}
      />
      <ButtonIcon
        size="large"
        icon="add-shopping-cart"
        onPress={handleAddproduct}
      />
    </Container>
  );
}
