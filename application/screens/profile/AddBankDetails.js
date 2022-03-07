import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    _onBankNameChange,
    _onBankIBANChange,
    _onBankAccountChange,
    _onBankAddressChange,
    _addBank,
    _onBankCodeChange,
    _updateBank,
} from '../../redux/reducers/user/user_actions';

import { COLORS, FONT, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';
import { AppBar, Button, LabelInput, Loader } from '../../components';
import { Dropdown } from 'react-native-material-dropdown';
const SymbolArray = [
    { value: "1" },
    { value: "3" },
    { value: "4" },
    { value: "6" },
]

const AddBankDetails = ({ navigation, route }) => {
    const { bank, type } = route.params;
    const dispatch = useDispatch();
    const [state, setstate] = useState({})
    const [add_loading, setAdd_loading] = useState(false)
    const [update_loading, setUpdate_loading] = useState(false)

    const [account_no, setAccount_no] = useState("")
    const [account_name, setAccount_name] = useState("")
    const [account_title, setAccount_title] = useState("")
    const [address, setAddress] = useState("")
    const [iban, setiban] = useState("")
    const [bankname, setBankname] = useState("")
    const [branchcode, setBranchcode] = useState("")

    const addbank_loading = useSelector(state => state.user.addbank_loading)



    const _onSaveButtonClick = () => {

        if (type == "Bank") {
            if (bankname.trim().length == 0)
                alert('Bank Name is required');
            else if (iban.trim().length == 0)
                alert('Bank IBAN is required');
            else if (account_title.trim().length == 0)
                alert('Bank Account Title is required');
            else if (account_no.trim().length == 0)
                alert('Bank Account is required');
            else if (branchcode.trim().length == 0)
                alert('Branch Code is required');
            else if (address.trim().length == 0)
                alert('Bank Address is required');
            else {
                let details = {
                    paymentmethod: "bankAccounts",
                    bankAccounts: [
                        {
                            bankName: bankname,
                            bankAddress: address,
                            branchCode: branchcode,
                            accountTitle: account_title,
                            iBAN: iban,
                            accountNumber: account_no,
                        }
                    ]
                }
                console.log({ details: details })
                dispatch(_addBank(details, state.token, state.user, navigation, type));
            }

        } else if (type === "Wallet") {

            if (account_name.trim().length == 0)
                alert('Wallet Name is required');
            else if (address.trim().length == 0)
                alert('Wallet Address is required');
            // else if (iban.trim().length == 0)
            // alert('Bank IBAN is required');
            else {
                let details = {
                    paymentmethod: "wallets",
                    wallets: [
                        {
                            currencyName: "USD",
                            walletAddress: address,
                            walletName: account_name,
                        }
                    ]
                }
                console.log({ details: details })
                dispatch(_addBank(details, state.token, state.user, navigation, type));
            }

        } else if (type === "Payoneer") {

            if (account_name.trim().length == 0)
                alert('Account Name is required');
            else if (account_no.trim().length == 0)
                alert('Account Number is required');
            else {
                let details = {
                    paymentmethod: "payoneer",
                    payoneer: [
                        {
                            accountNumber: account_no,
                            accountTitle: account_name,
                        }
                    ]
                }
                console.log({ details: details })
                dispatch(_addBank(details, state.token, state.user, navigation, type));
            }

        } else if (type === "Paypal") {

            if (account_name.trim().length == 0)
                alert('Account Name is required');
            else if (account_no.trim().length == 0)
                alert('Account Number is required');
            else {
                let details = {
                    paymentmethod: "paypal",
                    paypal: [
                        {
                            accountNumber: account_no,
                            accountTitle: account_name,
                        }
                    ]
                }
                console.log({ details: details })
                dispatch(_addBank(details, state.token, state.user, navigation, type));
            }

        }


    }

    //On Update Button Click
    const _onUpdateButtonClick = () => {
        if (state.bank_name.trim().length == 0)
            alert('Bank Name is required');
        else if (state.bank_iban.trim().length == 0)
            alert('Bank IBAN is required');
        else if (state.bank_account.trim().length == 0)
            alert('Bank Account is required');
        else if (state.bank_code.trim().length == 0)
            alert('Branch Code is required');
        else if (state.bank_address.trim().length == 0)
            alert('Bank Address is required');
        else {
            let details = {
                bankName: state.bank_name,
                iBAN: state.bank_iban,
                accountNumber: state.bank_account,
                branchCode: state.bank_code,
                bankAddress: state.bank_address,
                _id: bank._id
            };

            dispatch(_updateBank(details, state.token, state.user, navigation));
        }
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: bank == null ? 'Add ' + type : 'Edit ' + type
        });
        if (bank == null) {
            setAccount_no("");
            setAccount_name("");
            setBranchcode("");
            setBankname("");
            setiban("");
            setAddress("");
            setAccount_title("");
        }
        else {
            setAccount_no("")
            setAccount_name("")
            setBranchcode("")
            setBankname("")
            setiban("")
            setAddress("")
            setAccount_title("")

        }
    }, [])

    return (
        <View style={Styles._mainContainer}>
            <AppBar
                type='light'
                backgroundColor={COLORS.primaryColor2}
            />
            {/* Loader */}
            <Loader
                label='Adding ...'
                isVisible={addbank_loading}
            />
            <Loader
                label='Updating ...'
                isVisible={update_loading}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Styles._scrollContainer}
            >
                {type == "Bank" && <>
                    <LabelInput
                        label='Bank Name *'
                        placeholder='Bank Name'
                        value={bankname}
                        onChangeText={setBankname}
                    />
                    <LabelInput
                        label='IBAN # *'
                        placeholder='IBAN #'
                        value={iban}
                        onChangeText={setiban}
                        keyboard='number'
                        containerStyle={{ marginTop: WP(SPACING_PERCENT) }}
                    />
                    <LabelInput
                        label='Account Title  *'
                        placeholder='Account Title #'
                        value={account_title}
                        onChangeText={setAccount_title}
                        containerStyle={{ marginTop: WP(SPACING_PERCENT) }}
                    />
                    <LabelInput
                        label='Account # *'
                        placeholder='Account #'
                        value={account_no}
                        onChangeText={setAccount_no}
                        keyboard='number'
                        containerStyle={{ marginTop: WP(SPACING_PERCENT) }}
                    />
                    <LabelInput
                        label='Branch/Swift Code *'
                        placeholder='Branch/Swift Code'
                        value={branchcode}
                        onChangeText={setBranchcode}
                        keyboard='number'
                        containerStyle={{ marginTop: WP(SPACING_PERCENT) }}
                    />
                    <LabelInput
                        label='Bank Address *'
                        placeholder='Bank Address'
                        value={address}
                        onChangeText={setAddress}
                        containerStyle={{ marginTop: WP(SPACING_PERCENT) }}
                    />
                </>}

                {type == "Wallet" && <>

                    <LabelInput
                        label='Wallet Name # *'
                        placeholder='Walet Name #'
                        value={account_name}
                        onChangeText={setAccount_name}
                        containerStyle={{ marginTop: WP(SPACING_PERCENT) }}
                    />
                    <LabelInput
                        label='Wallet Address *'
                        placeholder='Wallet Address*'
                        value={address}
                        onChangeText={setAddress}
                    />

                    <Dropdown
                        useNativeDriver={true}
                        label='Select'
                        data={SymbolArray}
                        // value={state.invoice_discounttype}
                        fontSize={WP(TEXT_SIZES.info_1)}
                        labelFontSize={WP(TEXT_SIZES.info_1)}
                        selectedItemColor={COLORS.primaryColor}
                        // onChangeText={_onDiscountValueChange}
                        itemTextStyle={{
                            fontFamily: FONT,
                            fontSize: WP(TEXT_SIZES.info_1),
                            color: COLORS.blackColor
                        }}
                    />
                </>}
                {type == "Payoneer" && <>
                    <LabelInput
                        label='Account Name *'
                        placeholder='Account Name'
                        value={account_name}
                        onChangeText={setAccount_name}
                    />
                    <LabelInput
                        label='Account Number # *'
                        placeholder='Account Number #'
                        value={account_no}
                        onChangeText={setAccount_no}
                        keyboard='number'
                        containerStyle={{ marginTop: WP(SPACING_PERCENT) }}
                    />
                </>}
                {type == "Paypal" && <>
                    <LabelInput
                        label='Account Name *'
                        placeholder='Account Name'
                        value={account_name}
                        onChangeText={setAccount_name}
                    />
                    <LabelInput
                        label='Account Number # *'
                        placeholder='Account Number #'
                        value={account_no}
                        onChangeText={setAccount_no}
                        keyboard='number'
                        containerStyle={{ marginTop: WP(SPACING_PERCENT) }}
                    />
                </>}



                {
                    bank == null ? (
                        <Button
                            onPress={() => { _onSaveButtonClick() }}
                            title='Save'
                            titleColor={COLORS.whiteColor}
                            backgroundColor={COLORS.primaryColor2}
                            style={{ marginTop: WP(SPACING_PERCENT) }}
                        />
                    ) : (
                        <Button
                            onPress={() => { _onUpdateButtonClick() }}
                            title='Update'
                            titleColor={COLORS.whiteColor}
                            backgroundColor={COLORS.primaryColor2}
                            style={{ marginTop: WP(SPACING_PERCENT) }}
                        />
                    )
                }
            </ScrollView>
        </View>
    );
}

const Styles = StyleSheet.create({
    _mainContainer: {
        flex: 1,
    },
    _scrollContainer: {
        padding: WP(SPACING_PERCENT),
        paddingBottom: 200,
    },
});

export default AddBankDetails;