import {connect} from "react-redux";
import {initialized} from "./Redux/app/app-selector.ts";
import App from "./App.tsx";
import {useEffect} from "react";
import {initializeApp} from "./Redux/app/app-slice.ts";

interface AppAPIContainer {
    initialized: boolean
    initializeApp: void
}
const AppAPIContainer = ({initialized, initializeApp}: AppAPIContainer) => {

    useEffect(() => {
        // @ts-ignore
        initializeApp()
    }, [])

    return <App initialized={initialized}/>
}


const mapStateToProps = (state: any) => {
    return {
        initialized: initialized(state)
    }
};

// @ts-ignore
export default connect(mapStateToProps, {initializeApp})(AppAPIContainer)