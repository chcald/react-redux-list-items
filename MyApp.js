import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    FlatList,
    Button,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';


const MyApp = ({ catList, addCat, removeCat, editCat }) => {

    const [name, setName] = useState('');
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(-1);
    const [breed, setBreed,] = useState('');
    const [description, setDescription] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');


    const goEdit = (isEdit, id) => {
        setEdit(isEdit);
        setId(id);
        setName(catList[id].name);
        setBreed(catList[id].breed);
        setPhotoUrl(catList[id].photoUrl);
        setDescription(catList[id].description);

    }

    const finishEdit = () => {
        editCat({ id, name, breed, description, photoUrl })
        setEdit(false)
    }

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        setPhotoUrl(pickerResult.uri);
    }

    return (
        <View style={styles.container}>

            {!edit && <>
                <Text style={styles.text}>Name: </Text>
                <TextInput
                    onChangeText={setName}
                    style={styles.input}
                    value={name} />

                <Text style={styles.text}>Breed: </Text>
                <TextInput
                    onChangeText={setBreed}
                    style={styles.input}
                    value={breed} />

                <Text style={styles.text}>Description: </Text>
                <TextInput
                    onChangeText={setDescription}
                    style={styles.input}
                    value={description} />

                <Button onPress={openImagePickerAsync} title={"Pick a photo"} />

                <Image source={{ uri: photoUrl }} style={styles.image} />

                <View style={{ width: 200, paddingVertical: 20 }}>
                    <Button
                        title={'Add a new cat'}
                        onPress={() => addCat({ name, breed, description, photoUrl })}
                    />

                </View>
                <FlatList
                    data={catList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
                            <Text>{item.id} |</Text>
                            <Text>{item.name} |</Text>
                            <Text>{item.bread} |</Text>
                            <Text>{item.description} |</Text>
                            <Button
                                title={'remove'}
                                onPress={() => removeCat(item.id)} />

                            <Button
                                title={'edit'}
                                onPress={() => goEdit(true, item.id)} />
                        </View>
                    }
                />
            </>}

            {edit && (<View>
                <Text style={styles.text}>Name: </Text>
                <TextInput
                    onChangeText={setName}
                    style={styles.input}
                    value={name} />

                <Text style={styles.text}>Breed: </Text>
                <TextInput
                    onChangeText={setBreed}
                    style={styles.input}
                    value={breed} />

                <Text style={styles.text}>Description: </Text>
                <TextInput
                    onChangeText={setDescription}
                    style={styles.input}
                    value={description} />


                <Button onPress={openImagePickerAsync} title={"Pick a photo"} />

                <Image source={{ uri: photoUrl }} style={styles.image} />


                <Button
                    title={'Finish'}
                    onPress={finishEdit} />

            </View>)}


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 300,
        borderColor: 'black',
        borderWidth: 1,
    },
    text: {
        fontSize: 20
    },
    image: {
        width: 300,
        height: 300,
    }
});

function mapDispatchToProps(dispach) {
    return {
        addCat: (cat) => dispach({ type: 'ADD_CAT', payload: cat }),
        removeCat: (name) => dispach({ type: 'REMOVE_CAT', payload: name }),
        editCat: (cat) => dispach({ type: 'EDIT_CAT', payload: cat }),
    }

}

function mapStateToProps(state) {
    return {
        catList: state.catList,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyApp);