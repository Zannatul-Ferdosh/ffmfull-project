const UserForm = () => (
    <>
    <form className="kt-form" id="kt_user_add_form">
        <div className="kt-wizard-v4__content" data-ktwizard-type="step-content" data-ktwizard-state="current">
            <div className="kt-heading kt-heading--md">User's Profile Details:</div>
            <div className="kt-section kt-section--first">
                <div className="kt-wizard-v4__form">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="kt-section__body">
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Avatar</label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div className="kt-avatar kt-avatar--outline" id="kt_user_add_avatar">
                                            <div className="kt-avatar__holder" style={{backgroundImage: `url(require("assets/media/users/300_10.jpg"))`}}></div>
                                            <label className="kt-avatar__upload" data-toggle="kt-tooltip" title="Change avatar">
                                                <i className="fa fa-pen"></i>
                                                <input type="file" name="kt_user_add_user_avatar" />
                                            </label>
                                            <span className="kt-avatar__cancel" data-toggle="kt-tooltip" title="Cancel avatar">
                                                <i className="fa fa-times"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">First Name</label>
                                    <div className="col-lg-9 col-xl-9">
                                        <input className="form-control" type="text" value="Anna" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Last Name</label>
                                    <div className="col-lg-9 col-xl-9">
                                        <input className="form-control" type="text" value="Krox" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Company Name</label>
                                    <div className="col-lg-9 col-xl-9">
                                        <input className="form-control" type="text" value="Loop Inc." />
                                        <span className="form-text text-muted">If you want your invoices addressed to a company. Leave blank to use your full name.</span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Contact Phone</label>
                                    <div className="col-lg-9 col-xl-9">
                                        <div className="input-group">
                                            <div className="input-group-prepend"><span className="input-group-text"><i className="la la-phone"></i></span></div>
                                            <input type="text" className="form-control" value="+45678967456" placeholder="Phone" aria-describedby="basic-addon1" />
                                        </div>
                                        <span className="form-text text-muted">We'll never share your email with anyone else.</span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Email Address</label>
                                    <div className="col-lg-9 col-xl-9">
                                        <div className="input-group">
                                            <div className="input-group-prepend"><span className="input-group-text"><i className="la la-at"></i></span></div>
                                            <input type="text" className="form-control" value="anna.krox@loop.com" placeholder="Email" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group form-group-last row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Company Site</label>
                                    <div className="col-lg-9 col-xl-9">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Username" value="loop" />
                                            <div className="input-group-append"><span className="input-group-text">.com</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div className="kt-wizard-v4__content" data-ktwizard-type="step-content">
            <div className="kt-section kt-section--first">
                <div className="kt-wizard-v4__form">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="kt-section__body">
                                <div className="form-group row">
                                    <div className="col-lg-9 col-xl-6">
                                        <h3 className="kt-section__title kt-section__title-md">User's Account Details</h3>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Last Name</label>
                                    <div className="col-lg-9 col-xl-9">
                                        <input className="form-control" type="text" value="Anna" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Email Address</label>
                                    <div className="col-lg-9 col-xl-9">
                                        <div className="input-group">
                                            <div className="input-group-prepend"><span className="input-group-text"><i className="la la-at"></i></span></div>
                                            <input type="text" className="form-control" value="nick.watson@loop.com" placeholder="Email" aria-describedby="basic-addon1" />
                                        </div>
                                        <span className="form-text text-muted">Email will not be publicly displayed. <a href="#" className="kt-link">Learn more</a>.</span>
                                    </div>
                                </div>
                                
                                <div className="form-group form-group-last row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Communication</label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div className="kt-checkbox-inline">
                                            <label className="kt-checkbox">
                                                <input type="checkbox" checked="" /> Email
                                                <span></span>
                                            </label>
                                            <label className="kt-checkbox">
                                                <input type="checkbox" checked="" /> SMS
                                                <span></span>
                                            </label>
                                            <label className="kt-checkbox">
                                                <input type="checkbox" /> Phone
                                                <span></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="kt-separator kt-separator--border-dashed kt-separator--portlet-fit kt-separator--space-lg"></div>
                                <div className="form-group row">
                                    <div className="col-lg-9 col-xl-6">
                                        <h3 className="kt-section__title kt-section__title-md">User's Account Settings</h3>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Login verification</label>
                                    <div className="col-lg-9 col-xl-6">
                                        <button type="button" className="btn btn-label-brand btn-bold btn-sm kt-margin-t-5 kt-margin-b-5">Setup login verification</button>
                                        <span className="form-text text-muted">
                                            After you log in, you will be asked for additional information to confirm your identity and protect your account from being compromised.
                                            <a href="#" className="kt-link">Learn more</a>.
                                        </span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Password reset verification</label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div className="kt-checkbox-single">
                                            <label className="kt-checkbox">
                                                <input type="checkbox" /> Require personal information to reset your password.
                                                <span></span>
                                            </label>
                                        </div>
                                        <span className="form-text text-muted">
                                            For extra security, this requires you to confirm your email or phone number when you reset your password.
                                            <a href="#" className="kt-link">Learn more</a>.
                                        </span>
                                    </div>
                                </div>
                                <div className="form-group row kt-margin-t-10 kt-margin-b-10">
                                    <label className="col-xl-3 col-lg-3 col-form-label"></label>
                                    <div className="col-lg-9 col-xl-6">
                                        <button type="button" className="btn btn-label-danger btn-bold btn-sm kt-margin-t-5 kt-margin-b-5">Deactivate your account ?</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div className="kt-wizard-v4__content" data-ktwizard-type="step-content">
            <div className="kt-heading kt-heading--md">Setup Your Address</div>
            <div className="kt-form__section kt-form__section--first">
                <div className="kt-wizard-v4__form">
                    <div className="form-group">
                        <label>Address Line 1</label>
                        <input type="text" className="form-control" name="address1" placeholder="Address Line 1" value="Address Line 1" />
                        <span className="form-text text-muted">Please enter your Address.</span>
                    </div>
                    <div className="form-group">
                        <label>Address Line 2</label>
                        <input type="text" className="form-control" name="address2" placeholder="Address Line 2" value="Address Line 2" />
                        <span className="form-text text-muted">Please enter your Address.</span>
                    </div>
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="form-group">
                                <label>Postcode</label>
                                <input type="text" className="form-control" name="postcode" placeholder="Postcode" value="2000" />
                                <span className="form-text text-muted">Please enter your Postcode.</span>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" className="form-control" name="state" placeholder="City" value="London" />
                                <span className="form-text text-muted">Please enter your City.</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="form-group">
                                <label>State</label>
                                <input type="text" className="form-control" name="state" placeholder="State" value="VIC" />
                                <span className="form-text text-muted">Please enter your Postcode.</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

        <div className="kt-wizard-v4__content" data-ktwizard-type="step-content">
            <div className="kt-heading kt-heading--md">Review your Details and Submit</div>
            <div className="kt-form__section kt-form__section--first">
                <div className="kt-wizard-v4__review">
                    <div className="kt-wizard-v4__review-item">
                        <div className="kt-wizard-v4__review-title">
                            Your Account Details
                        </div>
                        <div className="kt-wizard-v4__review-content">
                            John Wick
                            <br /> Phone: +61412345678
                            <br /> Email: johnwick@reeves.com
                        </div>
                    </div>
                    <div className="kt-wizard-v4__review-item">
                        <div className="kt-wizard-v4__review-title">
                            Your Address Details
                        </div>
                        <div className="kt-wizard-v4__review-content">
                            Address Line 1
                            <br /> Address Line 2
                            <br /> Melbourne 3000, VIC, Australia
                        </div>
                    </div>
                    <div className="kt-wizard-v4__review-item">
                        <div className="kt-wizard-v4__review-title">
                            Payment Details
                        </div>
                        <div className="kt-wizard-v4__review-content">
                            Card Number: xxxx xxxx xxxx 1111
                            <br /> Card Name: John Wick
                            <br /> Card Expiry: 01/21
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="kt-form__actions">
            <div className="btn btn-secondary btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" data-ktwizard-type="action-prev">
                Previous
            </div>
            <div className="btn btn-success btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" data-ktwizard-type="action-submit">
                Submit
            </div>
            <div className="btn btn-brand btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" data-ktwizard-type="action-next">
                Next Step
            </div>
        </div>

    </form>
    </>
);

export default UserForm;