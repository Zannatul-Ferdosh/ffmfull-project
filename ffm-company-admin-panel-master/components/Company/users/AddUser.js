import NewUserHeader from './newUserHeader';
import UserForm from './UserForm';

const AddUser = () => (
    <>
    <NewUserHeader/>    
    <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
        <div className="kt-wizard-v4" id="kt_user_add_user" data-ktwizard-state="step-first">

            <div className="kt-wizard-v4__nav">
                <div className="kt-wizard-v4__nav-items nav">

                    <div className="kt-wizard-v4__nav-item nav-item" data-ktwizard-type="step" data-ktwizard-state="current">
                        <div className="kt-wizard-v4__nav-body">
                            <div className="kt-wizard-v4__nav-number">
                                1
                            </div>
                            <div className="kt-wizard-v4__nav-label">
                                <div className="kt-wizard-v4__nav-label-title">
                                    Profile
                                </div>
                                <div className="kt-wizard-v4__nav-label-desc">
                                    User's Personal Information
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="kt-wizard-v4__nav-item nav-item" data-ktwizard-type="step">
                        <div className="kt-wizard-v4__nav-body">
                            <div className="kt-wizard-v4__nav-number">
                                2
                            </div>
                            <div className="kt-wizard-v4__nav-label">
                                <div className="kt-wizard-v4__nav-label-title">
                                    Account
                                </div>
                                <div className="kt-wizard-v4__nav-label-desc">
                                    User's Account & Settings
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="kt-wizard-v4__nav-item nav-item" data-ktwizard-type="step">
                        <div className="kt-wizard-v4__nav-body">
                            <div className="kt-wizard-v4__nav-number">
                                3
                            </div>
                            <div className="kt-wizard-v4__nav-label">
                                <div className="kt-wizard-v4__nav-label-title">
                                    Address
                                </div>
                                <div className="kt-wizard-v4__nav-label-desc">
                                    User's Shipping Address
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="kt-wizard-v4__nav-item nav-item" data-ktwizard-type="step">
                        <div className="kt-wizard-v4__nav-body">
                            <div className="kt-wizard-v4__nav-number">
                                4
                            </div>
                            <div className="kt-wizard-v4__nav-label">
                                <div className="kt-wizard-v4__nav-label-title">
                                    Submission
                                </div>
                                <div className="kt-wizard-v4__nav-label-desc">
                                    Review and Submit
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kt-portlet">
                <div className="kt-portlet__body kt-portlet__body--fit">
                    <div className="kt-grid">
                        <div className="kt-grid__item kt-grid__item--fluid kt-wizard-v4__wrapper">

                            <UserForm />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
)

export default AddUser;