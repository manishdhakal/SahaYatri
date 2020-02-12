import React from "react";

// reactstrap components

// core components

function ProfilePageHeader() {

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("assets/img/fabio-mangione.jpg") + ")"
        }}
        className="page-header page-header-xs"
        data-parallax={true}

      >
        <div className="filter" />
      </div>
    </>
  );
}

export default ProfilePageHeader;
