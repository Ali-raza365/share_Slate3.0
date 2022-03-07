import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    PermissionsAndroid,
} from 'react-native';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    _onDocTitleChange,
    _onDocDescriptionChange,
    _onDocFileUpload,
    _onDocFileRemove,
    _addDoc,
    _updateDoc
} from '../../redux/reducers/user/user_actions';

import FileViewer from 'react-native-file-viewer';
import DocumentPicker from 'react-native-document-picker';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, FONT, PLATFORM, RADIUS, SCREEN_ICON_SIZE, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';
import { AppBar, Button, LabelInput, TextArea, PickerModal, ViewImageModal, ViewDocModal, Loader } from '../../components';
import { BASE_URL } from '../../api/apis';
import { _gotoViewAttachment } from '../../navigation/NavigationService';

const AddAttachment = ({navigation, route}) => {

    const {doc} = route.params;
    const dispatch = useDispatch();
    const state = useSelector(state => state.user);

    const [showPicker, setShowPicker] = useState(false);
    const [imageView, setImageView] = useState(false);
    const [docView, setDocView] = useState(false);

    //Toggle Picker
    const _togglePicker = () => {
        if(showPicker)
            setShowPicker(false);
        else
            setShowPicker(true);
    }

    //Toggle Image View
    const _toggleImageView = () => {
        if(imageView)
            setImageView(false);
        else
            setImageView(true);
    }

    //Toggle Image View
    const _toggleDocView = () => {
        if(docView)
            setDocView(false);
        else
            setDocView(true);
    }

    //On Select File Click
    const _onDocClick = () => {
        DocumentPicker.pick({
            type: DocumentPicker.types.pdf,
        })
        .then((result)=>{
            _togglePicker();
            dispatch(_onDocFileUpload(result.uri, result.name));
        })
        .catch((err)=>{
            if(err.code == "DOCUMENT_PICKER_CANCELED")
                console.log('User cancel the operation');
            else
                alert(err);
        })
    }

    //On Gallery Click
    const _onGalleryClick = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
            includeBase64: true,
            maxWidth: 300,
            maxHeight: 300,
        },(response)=>{
            if(response.didCancel){
                console.log("User cancell the operation");
            }
            else if(response.errorCode){
                alert(response.errorMessage);
            }
            else{
                _togglePicker();
                dispatch(_onDocFileUpload(response.uri, response.fileName));
            }
        });
    }

    //On Camera Click
    const _onCameraClick = async () => {
        if(PLATFORM === 'android'){
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "Camera Permission",
                        message:
                            "InvoiceMate wants camera access so that you can easily capture invoice image",
                        buttonNegative: "Cancel",
                        buttonPositive: "Allow"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    launchCamera({
                        mediaType: 'photo',
                        quality: 0.5,
                        includeBase64: true,
                        maxWidth: 300,
                        maxHeight: 300,
                    },(response)=>{
                        if(response.didCancel){
                            console.log("User cancel the operation");
                        }
                        else if(response.errorCode){
                            alert('Camera is not available. Please check camera permission');
                        }
                        else{
                            _togglePicker();
                            dispatch(_onDocFileUpload(response.uri, response.fileName));
                        }
                    });
                } 
                else {
                    console.log("Camera permission denied");
                }
            } 
            catch (err) {
                console.warn(err);
            }
        }
        else{
            launchCamera({
                mediaType: 'photo',
                quality: 0.5,
                includeBase64: true,
                maxWidth: 300,
                maxHeight: 300,
            },(response)=>{
                if(response.didCancel){
                    console.log("User cancel the operation");
                }
                else if(response.errorCode){
                    alert('Camera is not available. Please check camera permission');
                }
                else{
                    _togglePicker();
                    dispatch(_onDocFileUpload(response.uri, response.fileName));
                }
            });
        }
        
    }

    //Remove Doc
    const _removeFile = () => {
        dispatch(_onDocFileRemove());
    }

    //Add Document
    const _addDocument = () => {
        if(state.doc_title.trim().length == 0)
            alert('Document Title is required');
        else if(state.doc_description.trim().length == 0)
            alert('Document Description is required');
        else if(state.doc_file.trim().length == 0)
            alert('Document file is required');
        else{
            let details = {
                attachmentTitle: state.doc_title.trim(),
                discription: state.doc_description.trim(),
                attachment: state.doc_file,
                filename: state.doc_filename,
            }
            dispatch(_addDoc(details, state.token, state.user, navigation));
        }
    }

    //Update Document
    const _updateDocument = () => {
        if(state.doc_title.trim().length == 0)
            alert('Document Title is required');
        else if(state.doc_description.trim().length == 0)
            alert('Document Description is required');
        else if(state.doc_file.trim().length == 0)
            alert('Document file is required');
        else{

            if(state.doc_file.includes('https')){
                let data = {
                    attachmentTitle: state.doc_title.trim(),
                    discription: state.doc_description.trim(),
                    docId: doc._id,
                    eAttachmentT: doc.eAttachmentT,
                    eAttachmentPath: doc.eAttachmentPath,
                    eAttachmentURL: doc.eAttachmentURL,
                }
                
                dispatch(_updateDoc(data,state.token,state.user,navigation));
            }
            else{
                let form = new FormData();
                form.append('attachmentTitle',state.doc_title.trim());
                form.append('discription',state.doc_description.trim());
                form.append('docId',doc._id);
                
                const uploadUri = PLATFORM === 'ios' ? state.doc_file.replace('file://', '') : state.doc_file;
                form.append('attachment',{
                    uri: uploadUri,
                    name: state.doc_filename,
                    type:'*/*'
                });

                dispatch(_updateDoc(form,state.token,state.user,navigation));
            }
        }
    }

    //On View Document
    const _onViewDocument = () => {
        if(state.doc_file.includes('https')){
            _gotoViewAttachment(navigation,doc.eAttachmentURL);
        }
        else{
            FileViewer.open(state.doc_file)
            .then(() => {})
            .catch(error => {
                alert(error);
            });
        }
        
    }

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: doc != null ? 'Edit Document':'Add Document'
        })

        if(doc != null){
            dispatch(_onDocTitleChange(doc.attachmentTitle));
            dispatch(_onDocDescriptionChange(doc.description));
            dispatch(_onDocFileUpload((BASE_URL + doc.eAttachmentPath), doc.eAttachmentT));
        }
    },[])

    return(
        <View style={Styles._mainContainer}>
            <AppBar 
                type='light'
                backgroundColor={COLORS.primaryColor2}
            />

            {/* Loader */}
            <Loader 
                label='Adding Document...'
                isVisible={state.adddoc_loading}
            />
            <Loader 
                label='Updating Document...'
                isVisible={state.updatedoc_loading}
            />

            <ViewDocModal 
                onPress={_toggleDocView}
                isVisible={docView}
                source={state.doc_file}
            />

            <ViewImageModal 
                onPress={_toggleImageView}
                isVisible={imageView}
                image={state.doc_file}
            />

            <PickerModal 
                isVisible={showPicker}
                onCloseClick={_togglePicker}
                onCameraClick={_onCameraClick}
                onDocClick={_onDocClick}
                onGalleryClick={_onGalleryClick}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Styles._scrollContainer}
            >
                <LabelInput 
                    label='Attachment Title *'
                    placeholder='Attachment Title'
                    value={state.doc_title}
                    onChangeText={(text) => { dispatch(_onDocTitleChange(text)) }}
                />
                <TextArea 
                    label='Attachment Description *'
                    placeholder='Attachment Description'
                    value={state.doc_description}
                    onChangeText={(text) => { dispatch(_onDocDescriptionChange(text)) }}
                    containerStyle={{ marginTop: WP(SPACING_PERCENT) }}
                />

                <View style={Styles._addView}>
                    <View style={Styles._uploadBtn}>
                        <Text style={Styles._label}>Upload Document *</Text>
                        <Icon 
                            onPress={()=>{ _togglePicker() }}
                            name='plus'
                            size={WP(SCREEN_ICON_SIZE)}
                            color={COLORS.primaryColor}
                        />
                    </View>
                    <Text style={Styles._attNote}>Note: Attachment size should be less than 1 MB</Text>
                    {
                        state.doc_file ? (
                            <View style={Styles._fileView}>
                                <Text style={Styles._filename}>{state.doc_filename}</Text>
                                <View style={Styles._iconView}>
                                <Icon 
                                    onPress={()=>{ _removeFile() }}
                                    name='trash'
                                    size={WP(SCREEN_ICON_SIZE)}
                                    color={COLORS.primaryColor}
                                />
                                <Icon 
                                    onPress={()=>{ _onViewDocument() }}
                                    name='eye'
                                    size={WP(SCREEN_ICON_SIZE)}
                                    color={COLORS.primaryColor}
                                />
                                </View>
                            </View>
                        ):(
                            null
                        )
                    }
                </View>
                

                <Button 
                    onPress={()=> { doc != null ? _updateDocument() : _addDocument() }}
                    title={doc != null ? 'Update' : 'Save'}
                    titleColor={COLORS.whiteColor}
                    backgroundColor={COLORS.primaryColor2}
                    style={{ marginTop: WP(SPACING_PERCENT) }}
                />
            </ScrollView>
        </View>
    );
}

const Styles = StyleSheet.create({
    _mainContainer: {
        flex: 1,
    },
    _scrollContainer:{
        padding: WP(SPACING_PERCENT),
        paddingBottom: 100,
    },
    _uploadBtn:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    _addView:{
        width: '100%',
        backgroundColor: COLORS.whiteColor,
        padding: WP(SPACING_PERCENT/2),
        shadowColor: COLORS.blackColor,
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: WP(RADIUS),
        elevation: 10,
        borderRadius: WP(RADIUS),
        marginTop: WP(SPACING_PERCENT)
    },
    _attNote:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_2),
        color: COLORS.blackColor,
        marginTop: WP(SPACING_PERCENT/5),
        color: COLORS.blackColor
    },
    _label:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        color: COLORS.blackColor
    },
    _filename:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_2),
        color: COLORS.blackColor
    },
    _fileView:{
        marginTop: WP(SPACING_PERCENT/2)
    },
    _iconView:{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: WP(SPACING_PERCENT/2),
        justifyContent: 'space-between',
        width: WP('15%'),
    },
});

export default AddAttachment;