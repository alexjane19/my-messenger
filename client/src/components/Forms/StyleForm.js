import {makeStyles} from "@material-ui/core";

export const formStyles = makeStyles({
    root: {
        flexGrow: 1,
        height: '100%'
    },
    imageBackground: {
        background: 'linear-gradient(180deg, #3a8dff 0%, #86b9ff 100%);',
        opacity: '85%',
        height: '100%',
    },
    image: {
        backgroundImage: 'url(/assets/images/bg-img.png)',
        backgroundSize: 'cover',
    },
    chatImage: {
        width: 67,
        height: 66,
    },
    textBackground: {
        fontSize: 26,
        color: '#ffffff',
        fontWeight: 400,
        fontFamily: 'Open Sans',
        textAlign: 'center',
    },
    formContainer:{
        flexGrow: 1,
        paddingTop: 60,
    },
    innerForm:{
        width: 'inherit',
        textAlign: 'center'
    },
    gridItemForm: {
        margin: 'auto'
    },
    formButton:{
        paddingInline: 60,
        paddingBlock: 15,
        marginTop: 48,
    },
    linkButton:{
        borderRadius: 5,
        filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2));',
        backgroundColor: '#ffffff',
        paddingInline: 30,
        paddingBlock: 15,
        marginLeft: 20,
    }
});
