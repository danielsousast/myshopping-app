import React, { useEffect } from "react";
import { Alert, FlatList } from "react-native";
import storage from "@react-native-firebase/storage";
import { Container, PhotoInfo } from "./styles";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";
import { File, FileProps } from "../../components/File";

export function Receipts() {
  const [photos, setPhotos] = React.useState<FileProps[]>([]);
  const [photoSelected, setPhotoSelected] = React.useState<string>();
  const [photoInfo, setPhotoInfo] = React.useState<string>();

  async function getPhotos() {
    storage()
      .ref("images")
      .listAll()
      .then((res) => {
        const files: FileProps[] = [];
        res.items.forEach((item) => {
          files.push({
            path: item.fullPath,
            name: item.name,
          });
        });

        setPhotos(files);
      });
  }

  useEffect(() => {
    getPhotos();
  }, []);

  async function handleOnSowImage(path: string) {
    const urlImage = await storage().ref(path).getDownloadURL();
    setPhotoSelected(urlImage);
    const infoImage = await storage().ref(path).getMetadata();
    setPhotoInfo(`Upload em: ${infoImage.timeCreated}`);
  }

  async function handleOnDelete(path: string) {
    await storage()
      .ref(path)
      .delete()
      .then(() => {
        getPhotos();
        Alert.alert("Sucesso", "Imagem deletada com sucesso");
      })
      .catch(() => {
        Alert.alert("Erro", "Erro ao deletar imagem");
      });
  }

  return (
    <Container>
      <Header title="Comprovantes" />
      <Photo uri={photoSelected} />
      <PhotoInfo>{photoInfo}</PhotoInfo>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleOnSowImage(item.path)}
            onDelete={() => handleOnDelete(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", padding: 24 }}
      />
    </Container>
  );
}
