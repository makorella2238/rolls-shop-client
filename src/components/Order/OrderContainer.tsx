import {connect} from "react-redux";
import Preloader from "../common/Preloader/Preloader.tsx";
import {isAuth} from "../Redux/app/app-selector.ts";
import AuthModal from "../AuthModal/AuthModal.tsx";
import {useGetOrderItems} from "../hooks/order.ts";
import Order from "./Order.tsx";


interface OrderContainerProps {
    isAuth: boolean
}


const OrderContainer = ({isAuth}: OrderContainerProps) => {
    if (!isAuth) {
        return <AuthModal/>
    }

    const {data, isLoading, error} = useGetOrderItems()

    if (!data) {
        return <Preloader/>;
    }
    if (error) {
        // @ts-ignore
        return <p>{ error }</p>
    }

    return <Order orderItems={ data } isLoading={ isLoading }/>
}

const mapStateToProps = (state: any) => {
    return {
        isAuth: isAuth(state),
    }
};

// @ts-ignore
export default connect(mapStateToProps, {})(OrderContainer)