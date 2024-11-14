import React from "react";

export default function CTA() {
  return (
    <div>
      <section className="bsb-cta-2 py-5">
        <div className="container-fluid">
          <div className="card border-0 rounded-3 overflow-hidden text-center bsb-overlay" style={{backgroundImage:"url('https://picsum.photos/350/200')", }}>
            <div className="card-body">
              <div className="row align-items-center justify-content-center">
                <div className="col-12 col-md-10 col-xl-8 col-xxl-7">
                  <h1 className="h5 mb-4 text-black text-uppercase">
                    Our Services & Expertise and this is cta
                  </h1>
                  {/* <h2 className="display-4 text-white mb-5">
                    We are a design agency studio delivering custom creative &
                    unique websites.
                  </h2> */}
                  <a
                    href="#!"
                    className="btn btn-light bsb-btn-3xl rounded mb-0 text-nowrap"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
