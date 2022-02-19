import React,{useState,useEffect} from 'react';
import axios from 'axios'
import './dashboard.scss'
import { Row, Col } from 'antd';

const Main = () => {

  return (
    <div className='dashboard'>

      {/* <Row gutter={[16, 16]}>

        <Col xs={{span:24}} lg={{span:6}} style={{marginBottom:"10px"}}>
          <div className="card text-white bg-gradient-primary">
            <div className="card-body pb-0 d-flex justify-content-between"><div>
              <div className="text-value-lg">0</div>
              <div>Total Company</div>
            </div>
            </div>
          </div>
        </Col>

        <Col xs={{span:24}} lg={{span:6}} className="col-sm-6 col-lg-3 mb-3">
          <div className="card text-white bg-gradient-info" >
            <div className="card-body pb-0 d-flex justify-content-between"><div>
              <div className="text-value-lg">0</div>
              <div>Total Service</div>
            </div>
            </div>
          </div>
        </Col>

        <Col xs={{span:24}} lg={{span:6}} className="col-sm-6 col-lg-3 mb-3">
          <div className="card text-white bg-gradient-warning">
            <div className="card-body pb-0 d-flex justify-content-between"><div>
              <div className="text-value-lg">0</div>
              <div>Total User</div>
            </div>
            </div>
          </div>
        </Col>

        <Col xs={{span:24}} lg={{span:6}} className="col-sm-6 col-lg-3 mb-3">
          <div className="card text-white bg-gradient-danger" >
            <div className="card-body pb-0 d-flex justify-content-between"><div>
              <div className="text-value-lg">0</div>
              <div>Total Brands</div>
            </div>
            </div>
          </div>
        </Col>

      </Row> */}
      dashboard


    </div>
  );
};

export default Main;
