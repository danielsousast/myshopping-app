import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Alert } from "react-native";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signInWithEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert("Sucesso", "Usuário logado com sucesso");
      })
      .catch(() => {
        Alert.alert("Erro", "Usuário ou senha inválidos");
      });
  }

  function handleCreateUserAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert("Sucesso", "Usuário criado com sucesso");
      })
      .catch((err) => {
        Alert.alert("erro", err.message);
      });
  }

  function handleForgotPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Sucesso", "Email enviado com sucesso");
      })
      .catch((err) => {
        Alert.alert("Erro", err.message);
      });
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>
      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />
      <Button title="Entrar" onPress={signInWithEmailAndPassword} />
      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateUserAccount}
        />
      </Account>
    </Container>
  );
}
