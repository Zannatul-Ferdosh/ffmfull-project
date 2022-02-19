const NewUserHeader = () => (
    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-container  kt-container--fluid ">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">
                New User
            </h3>
            <span class="kt-subheader__separator kt-subheader__separator--v"></span>
            <div class="kt-subheader__group" id="kt_subheader_search">
                <span class="kt-subheader__desc" id="kt_subheader_total">
                    Enter user details and submit </span>
            </div>
        </div>
        <div class="kt-subheader__toolbar">
            <a href="#" class="btn btn-default btn-bold">
                Back </a>
            <div class="btn-group">
                <button type="button" class="btn btn-brand btn-bold">
                    Submit </button>
                <button type="button" class="btn btn-brand btn-bold dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                    <ul class="kt-nav">
                        <li class="kt-nav__item">
                            <a href="#" class="kt-nav__link">
                                <i class="kt-nav__link-icon flaticon2-writing"></i>
                                <span class="kt-nav__link-text">Save &amp; continue</span>
                            </a>
                        </li>
                        <li class="kt-nav__item">
                            <a href="#" class="kt-nav__link">
                                <i class="kt-nav__link-icon flaticon2-medical-records"></i>
                                <span class="kt-nav__link-text">Save &amp; add new</span>
                            </a>
                        </li>
                        <li class="kt-nav__item">
                            <a href="#" class="kt-nav__link">
                                <i class="kt-nav__link-icon flaticon2-hourglass-1"></i>
                                <span class="kt-nav__link-text">Save &amp; exit</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
)

export default NewUserHeader;