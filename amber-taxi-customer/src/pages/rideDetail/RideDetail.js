// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
//Boostrap icon 5
import 'bootstrap-icons/font/bootstrap-icons.css';


import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuNavbar } from "../../components";
import { Avatar, Flex, Card as CardAntd, Button as ButtonAntd, Skeleton, Switch, Rate, Divider, Space, Tag, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import Chart from '../../components/Chart/Chart';

import { calculateDistance, handlingCurrency, handlingDateTime } from "../../utils";
import { beAPI } from "../../api";

import "./ride-detail.style.css";

const { Meta } = CardAntd;

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];


function RideDetail() {
    const [ratingList, setRatingList] = useState([]);
    const [ride, setRide] = useState(null);
    const [value, setValue] = useState(3);

    // Biến ridestatus
    const [ridestatus, setRideStatus] = useState({
        uuid: null,
        rideId: null,
        driverId: null,
        driverShiftId: null,
        state: null,
        stateTime: null,
        stateDetail: null
    });

    // Biến uuid của ride lấy từ params
    let { uuid } = useParams();

    const getRidestatus = async () => {
        // Lấy dữ liệu ridestatus
        let responseRidestatusData = await beAPI.get(`/ridestatus/rideId/${uuid}`);
    
        if(responseRidestatusData.status == 200){
          // set ridestatus
          if( JSON.stringify(responseRidestatusData.data.data) && JSON.stringify(ridestatus) ){
            setRideStatus(responseRidestatusData.data.data);
          }
        }
    }

    const getRide = async () => {
        // Lấy dữ liệu ridestatus
        let responseRideData = await beAPI.get(`/ride/${uuid}`);
    
        if(responseRideData.status == 200){
          // set ridestatus
          if( JSON.stringify(responseRideData.data.data) && JSON.stringify(ride) ){
            setRide(responseRideData.data.data);
          }
        }
    }

    useEffect(() => {
        if( localStorage.getItem("uuid") == null ){
            window.location.href = `/login`;
        }

        if(ride == null){
            getRide();
        }

        if(ridestatus.driverId == null){
            getRidestatus();
        }

        //getRatingList();
    }, [])


    return (
        <>
            <MenuNavbar />
            <>
                <div className="container-ride-detail my-4">
                    <div id="logo">
                        <ButtonAntd><i class="bi bi-star"></i></ButtonAntd>
                    </div>

                    <div className="main">
                        <h1>Chi tiết chuyến đi</h1>

                        <h2>Cảm ơn bạn đã chọn Amber Taxi!</h2>

                        <p>{ridestatus.stateTime}</p>
                    </div>

                    <div className="location">


                        <div className="location__line" />
                    
                        <div className="dot pickup">
                            <div className="inner" />
                        </div>

                        <div className="location__pickup">
                            <h3>
                                Đón tại <span>7:30 PM</span>
                            </h3>
                            <p>
                                {ride != null && <>
                                    { ride.startingPoint.split(";")[2] }
                                </>}
                            </p>
                        </div>

                        <div className="dot dropoff">
                            <div className="inner" />
                        </div>

                        <div className="location__dropoff">
                            <h3>
                                Dừng tại <span>8:45 PM</span>
                            </h3>
                            <p>
                                {ride != null && <>
                                    { ride.destinationPoint.split(";")[2] }
                                </>}
                            </p>
                        </div>

                    </div>

                    <h2 className="receipt__title">Chi tiết chuyến đi</h2>
                    <div className="receipt">
                        { ride != null && 
                        <>
                        <div className="receipt__grid1">
                            <p>Quãng đường</p>
                            <p>Tổng thời gian</p>
                            <p className="total">Tiền mặt</p>
                        </div>
                        <div className="receipt__grid2">
                            <p>{ride.distance} km</p>
                            <p>1:15:02</p>
                            <p className="total">{handlingCurrency.convertFloatNumberToVNDFormat(ride.price)}</p>
                        </div>
                        </>
                        }
                    </div>

                    <div className="receipt__line" />
                    
                    <div className="lyft__footer">
                        <p>
                            <i className="far fa-copyright" /> Amber Taxi 2024
                            <br />
                            Lê Văn Lương Quận 7 
                            <br />
                            Thành phố Hồ Chí Minh 91000
                        </p>
                    </div>
                </div>
            </>
        </>
    )
}


export default RideDetail;