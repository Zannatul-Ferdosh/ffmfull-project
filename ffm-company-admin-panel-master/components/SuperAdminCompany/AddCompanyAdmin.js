import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";

class AddCompanyC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      verification_file: "",
      agreement_file: "",
      tin: "",
      services: [],
      service_id: [],
      company_id: "",
    };

    this.ServiceHandler = this.ServiceHandler.bind(this);
  }

  componentDidMount() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    console.log("am in");
    axios
      .get(
        "/api/v1/field-force/users/superadmin/services/list",
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log("am the response");
        this.setState({ services: res.data.data });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  notify = (val) => toast(val);

  AddCompany = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const data = {
      name: this.state.name,
      address: this.state.address,

      tin: this.state.tin,
    };

    axios
      .post(
        "/api/v1/field-force/users/superadmin/company/create",
        data,
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        this.setState({
          name: "",
          address: "",
          verification_file: "",
          agreement_file: "",
          tin: "",
          company_id: res.data.data.id,
        });
        const resp = res.data;

        const data2 = {
          service_id: this.state.service_id,
          company_id: parseInt(this.state.company_id),
        };

        console.log(data2);
        axios
          .post(
            "/api/v1/field-force/users/superadmin/company/assign-servcie-company",
            data2,
            {
              headers: headers,
            }
          )
          .then((res) => {
            let companyid = parseInt(this.state.company_id);

            let data3 = {
              verification_file: this.state.verification_file,

              agreement_file: this.state.agreement_file,
            };
            axios
              .put(
                "/api/v1/field-force/users/superadmin/company/update/" +
                  companyid,
                data3,
                {
                  headers: headers,
                }
              )
              .then((res) => {
                this.setState({
                  service_id: "",
                  company_id: "",
                });
                const resp = res.data;
                Router.push("/super-admin-company");
                console.log(resp);
                this.notify(resp.message);
              })
              .catchO((err) => {});
          })
          .catch((err) => {
            console.log(err);
          });

        console.log(resp);
        this.notify(resp.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  formChange = (e) => {
    this.setState({
      [e.target.name]:
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value,
    });
  };

  ServiceHandler = (e) => {
    // this.state.service_id = this.state.service_id || {};
    if (e.target.checked) {
      

      if (!this.state.service_id.includes(parseInt(e.target.value))) {
        this.state.service_id.push(parseInt(e.target.value));
      }
    } else {
      delete this.state.service_id[this.state.service_id.indexOf(parseInt(e.target.value))];
      let service = this.state.service_id.filter(e=>e)
    
      this.setState({service_id: service});

     
    }
    console.log(this.state.service_id);


  };

  render() {
    return (
      <div className="kt-portlet">
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">Add New Company</h3>
          </div>
        </div>
        <ToastContainer />
        <form
          className="kt-form"
          onSubmit={(e) => {
            e.preventDefault();
            this.AddCompany();
          }}
        >
          <div className="kt-portlet__body">
            <div className="form-group">
              <label>
                Company Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                name="name"
                value={this.state.name}
                onChange={this.formChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                Company Address <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Address"
                name="address"
                value={this.state.address}
                onChange={this.formChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                Company Agreement_file{" "}
                <span style={{ color: "red" }}> (PDF only)*</span>
              </label>
              <input
                type="file"
                className="form-control"
                placeholder="Enter file"
                name="agreement_file"
                value={this.state.agreement_file}
                onChange={this.formChange}
                accept="application/pdf"
                required
              />
            </div>

            <div className="form-group">
              <label>
                Verification file{" "}
                <span style={{ color: "red" }}> (PDF only)*</span>
              </label>
              <input
                type="file"
                className="form-control"
                placeholder="Enter file"
                name="verification_file"
                value={this.state.verification_file}
                onChange={this.formChange}
                accept="application/pdf"
                required
              />
            </div>

            <div className="form-group">
              <label>
                Company Tin number <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter number"
                name="tin"
                value={this.state.tin}
                onChange={this.formChange}
                required
              />
            </div>

            {/* <div className="form-group">
              <label>Assign Service to Company </label>
              <select
                className="form-control"
                name="service_id"
                value={this.state.service_id}
                onChange={this.formChange}
              >
                <option>-- Select --</option>
                {this.state.services.map((service) => {
                  return <option value={service.id}>{service.name}</option>;
                })}
              </select>
            </div> */}

            <div className="form-group">
              <label>
                Services <span style={{ color: "red" }}>*</span>
              </label>
              {this.state.services.map((service) => {
                return (
                  <div className="col-2">
                    <input
                      type="checkbox"
                      name="service_id"
                      value={service.id}
                      onChange={this.ServiceHandler}
                    />
                    &nbsp;
                    <label className="form-check-label" for="exampleCheck1">
                      {service.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="kt-portlet__foot">
            <div className="kt-form__actions">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              &nbsp;
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddCompanyC;
