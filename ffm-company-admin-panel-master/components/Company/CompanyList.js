import React, { Component } from "react";
import PropTypes from "prop-types";

class CompanyList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="kt-portlet kt-portlet--mobile">
        <div className="kt-portlet__head kt-portlet__head--lg">
          <div className="kt-portlet__head-label">
            <span className="kt-portlet__head-icon">
              <i className="kt-font-brand flaticon2-line-chart"></i>
            </span>
            <h3 className="kt-portlet__head-title">Company List</h3>
          </div>

          <div className="kt-portlet__head-toolbar">
            <div className="kt-portlet__head-wrapper">
              <div className="kt-portlet__head-actions">
                <div className="dropdown dropdown-inline">
                  <button
                    type="button"
                    className="btn btn-default btn-icon-sm dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="la la-download"></i> Export
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <ul className="kt-nav">
                      <li className="kt-nav__section kt-nav__section--first">
                        <span className="kt-nav__section-text">
                          Choose an option
                        </span>
                      </li>
                      <li className="kt-nav__item">
                        <a href="#" className="kt-nav__link">
                          <i className="kt-nav__link-icon la la-print"></i>
                          <span className="kt-nav__link-text">Print</span>
                        </a>
                      </li>
                      <li className="kt-nav__item">
                        <a href="#" className="kt-nav__link">
                          <i className="kt-nav__link-icon la la-copy"></i>
                          <span className="kt-nav__link-text">Copy</span>
                        </a>
                      </li>
                      <li className="kt-nav__item">
                        <a href="#" className="kt-nav__link">
                          <i className="kt-nav__link-icon la la-file-excel-o"></i>
                          <span className="kt-nav__link-text">Excel</span>
                        </a>
                      </li>
                      <li className="kt-nav__item">
                        <a href="#" className="kt-nav__link">
                          <i className="kt-nav__link-icon la la-file-text-o"></i>
                          <span className="kt-nav__link-text">CSV</span>
                        </a>
                      </li>
                      <li className="kt-nav__item">
                        <a href="#" className="kt-nav__link">
                          <i className="kt-nav__link-icon la la-file-pdf-o"></i>
                          <span className="kt-nav__link-text">PDF</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                &nbsp;
                <a href="#" className="btn btn-brand btn-elevate btn-icon-sm">
                  <i className="la la-plus"></i>
                  Add New Company Admin
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="kt-portlet__body">
          <div
            id="kt_table_1_wrapper"
            className="dataTables_wrapper dt-bootstrap4 no-footer"
          >
            <div className="row">
              <div className="col-md-12">
                <table
                  className="table table-striped- table-bordered table-hover table-checkable dataTable no-footer dtr-inline"
                  id="kt_table_1"
                  role="grid"
                  aria-describedby="kt_table_1_info"
              
                >
                  <thead>
                      <tr>
                      <th className="sorting_desc" tabindex="0" aria-controls="kt_table_1" rowspan="1" colspan="1" aria-sort="descending" aria-label="Order ID: activate to sort column ascending">Id</th>
                      <th className="sorting_desc" tabindex="0" aria-controls="kt_table_1" rowspan="1" colspan="1" aria-sort="descending" aria-label="Order ID: activate to sort column ascending">Name</th>
                      <th className="sorting_desc" tabindex="0" aria-controls="kt_table_1" rowspan="1" colspan="1" aria-sort="descending" aria-label="Order ID: activate to sort column ascending">Address</th>
                      <th className="sorting_desc" tabindex="0" aria-controls="kt_table_1" rowspan="1" colspan="1" aria-sort="descending" aria-label="Order ID: activate to sort column ascending">Phone</th>
                      <th className="sorting_desc" tabindex="0" aria-controls="kt_table_1" rowspan="1" colspan="1" aria-sort="descending" aria-label="Order ID: activate to sort column ascending">EMail</th>
                      <th className="sorting_desc" tabindex="0" aria-controls="kt_table_1" rowspan="1" colspan="1" aria-sort="descending" aria-label="Order ID: activate to sort column ascending"> Others</th>
                     </tr>
                  </thead>
                  <tbody>
                  <tr role="row" className="odd">
                  <td className="sorting_1">68428-725</td>
                  <td className="sorting_1">68428-725</td>
                  <td className="sorting_1">68428-725</td>
                  <td className="sorting_1">68428-725</td>
                  <td className="sorting_1">68428-725</td>
                  <td className="sorting_1">68428-725</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row">
            <div className="col-sm-12 col-md-5"><div className="dataTables_info" id="kt_table_1_info" role="status" aria-live="polite">Showing 1 to 10 of 40 entries</div></div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

CompanyList.propTypes = {};

export default CompanyList;
