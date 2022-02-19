import React, { Component } from "react";
import "../css/style.bundle.css";
class DataCounter extends Component {
  render() {
    return (
      <div className="kt-portlet">
        <div className="kt-portlet__body  kt-portlet__body--fit">
          <div className="row row-no-padding row-col-separator-lg">
            <div className="col-md-12 col-lg-6 col-xl-4">
              <div className="kt-widget24">
                <div className="kt-widget24__details">
                  <div className="kt-widget24__info">
                    <h4 className="kt-widget24__title">Total Company </h4>
                    <span className="kt-widget24__desc">All Customs Value</span>
                  </div>
                  <span className="kt-widget24__stats kt-font-brand">18</span>
                </div>
                <div className="progress progress--sm">
        <div className="progress-bar kt-bg-brand" role="progressbar"  aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
                <div className="kt-widget24__action">
                  <span className="kt-widget24__change">Change</span>
                  <span className="kt-widget24__number">78%</span>
                </div>
              </div>
            </div>

            <div className="col-md-12 col-lg-6 col-xl-4">
              <div className="kt-widget24">
                <div className="kt-widget24__details">
                  <div className="kt-widget24__info">
                    <h4 className="kt-widget24__title">Total service</h4>
                    <span className="kt-widget24__desc">All Customs Value</span>
                  </div>
                  <span className="kt-widget24__stats kt-font-brand">4</span>
                </div>
                <div className="progress progress--sm">
        <div className="progress-bar kt-bg-brand" role="progressbar"  aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
                <div className="kt-widget24__action">
                  <span className="kt-widget24__change">Change</span>
                  <span className="kt-widget24__number">78%</span>
                </div>
              </div>
            </div>


            <div className="col-md-12 col-lg-6 col-xl-4">
              <div className="kt-widget24">
                <div className="kt-widget24__details">
                  <div className="kt-widget24__info">
                    <h4 className="kt-widget24__title">Total users</h4>
                    <span className="kt-widget24__desc">All Customs Value</span>
                  </div>
                  <span className="kt-widget24__stats kt-font-brand">18</span>
                </div>
                <div className="progress progress--sm">
        <div className="progress-bar kt-bg-brand" role="progressbar"  aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
                <div className="kt-widget24__action">
                  <span className="kt-widget24__change">Change</span>
                  <span className="kt-widget24__number">78%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DataCounter;
