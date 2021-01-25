// import React, { Component } from "react";
// import Navbar from "../NavBar/Navbar";
// import Footer from "../Footer/Footer";
// import Bootstrap from './../../Bootstrap/bootstrap.module.css'
// import './Faqs.css'

// var heading = {
//   backgroundColor: "#344466",
//   borderRadius: "0",
//   marginBottom: "4px",
//   border: "none"
// };

// class FAQs extends Component {
//   state = {};
//   render() {
//     return (
//       <div>
//         <Navbar />
//         <div className={Bootstrap['col-12']}>
// <h1 className="mb-4 text-center">
//   FAQs
//   <hr
//     style={{
//       width: "30px",
//       height: "2px",
//       color: "#987c46",
//       backgroundColor: "#987c46",
//       alignContent:'center',
//       marginLeft:'49%',
//     }}
//   />
// </h1>
//         </div>
//         <div className="container" style={{ marginTop: "3%"}}>
//           <ul className="nav nav-tabs" id="myTab" role="tablist">
//             <li className="nav-item">
//               <a
//                 className="nav-link active"
//                 data-toggle="tab"
//                 href="#walkthrough"
//                 role="tab"
//                 aria-controls="walkthrough"
//               >
//                 Walkthrough
//               </a>
//             </li>
//             <li className="nav-item">
//               <a
//                 className="nav-link"
//                 data-toggle="tab"
//                 href="#processFlow"
//                 role="tab"
//                 aria-controls="processFlow"
//               >
//                 Process Flow
//               </a>
//             </li>
//             <li className="nav-item">
//               <a
//                 className="nav-link"
//                 data-toggle="tab"
//                 href="#privacy"
//                 role="tab"
//                 aria-controls="privacy"
//               >
//                 Privacy
//               </a>
//             </li>
//             <li className="nav-item">
//               <a
//                 className="nav-link"
//                 data-toggle="tab"
//                 href="#uploadSize"
//                 role="tab"
//                 aria-controls="uploadSize"
//               >
//                 Upload Size
//               </a>
//             </li>
//             <li className="nav-item">
//               <a
//                 className="nav-link"
//                 data-toggle="tab"
//                 href="#management"
//                 role="tab"
//                 aria-controls="management"
//               >
//                 Management
//               </a>
//             </li>
//           </ul>

//           <div className="tab-content" >
//             <div className="tab-pane active" id="walkthrough" role="tabpanel">
//               <div className="container-fluid bg-gray" id="accordion-style-1">
//                 <div className="container">
//                   <section style={{ paddingTop: 0 }}>
//                     <div className="row">
//                       <div className="col-10 mx-auto">
//                         <div
//                           className="accordion"
//                           id="accordionExample"
//                           style={{
//                             width: "100%"
//                           }}
//                         >
//                           <div
//                             className="card"
//                             style={{
//                               border: "none"
//                             }}
//                           >
//                             <div
//                               className="card-header"
//                               id="headingOne"
//                               style={heading}
//                             >
//                               <h5 className="mb-0">
//                                 <button
//                                   className="btn btn-link btn-block text-left"
//                                   type="button"
//                                   data-toggle="collapse"
//                                   data-target="#collapseOne"
//                                   aria-expanded="true"
//                                   aria-controls="collapseOne"
//                                 >
//                                   <i className="fa fa-chevron-down main" />
//                                   Why do we use it?
//                                 </button>
//                               </h5>
//                             </div>

//                             <div
//                               id="collapseOne"
//                               className="collapse show fade"
//                               aria-labelledby="headingOne"
//                               data-parent="#accordionExample"
//                             >
//                               <div className="card-body">
//                                 Anim pariatur cliche reprehenderit, enim eiusmod
//                                 high life accusamus terry richardson ad squid. 3
//                                 wolf moon officia aute, non cupidatat skateboard
//                                 dolor brunch. Food truck quinoa nesciunt laborum
//                                 eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
//                                 put a bird on it squid single-origin coffee
//                                 nulla assumenda shoreditch et. Nihil anim
//                                 keffiyeh helvetica, craft beer labore wes
//                                 anderson put a bird on it squid single-origin
//                                 coffee nulla assumenda shoreditch et. cred
//                                 nesciunt sapiente ea proident. Ad vegan
//                                 excepteur butcher vice lomo. Leggings occaecat
//                                 craft beer farm-to-table, raw denim aesthetic
//                                 synth nesciunt you probably haven't heard of
//                                 them accusamus labore sustainable VHS.
//                               </div>
//                             </div>
//                           </div>
//                           <div
//                             className="card"
//                             style={{
//                               border: "none"
//                             }}
//                           >
//                             <div
//                               className="card-header"
//                               id="headingTwo"
//                               style={heading}
//                             >
//                               <h5 className="mb-0">
//                                 <button
//                                   className="btn btn-link collapsed btn-block text-left"
//                                   type="button"
//                                   data-toggle="collapse"
//                                   data-target="#collapseTwo"
//                                   aria-expanded="false"
//                                   aria-controls="collapseTwo"
//                                 >
//                                   <i className="fa fa-chevron-down main" />
//                                   Where does it come from?
//                                 </button>
//                               </h5>
//                             </div>
//                             <div
//                               id="collapseTwo"
//                               className="collapse fade"
//                               aria-labelledby="headingTwo"
//                               data-parent="#accordionExample"
//                             >
//                               <div className="card-body">
//                                 Anim pariatur cliche reprehenderit, enim eiusmod
//                                 high life accusamus terry richardson ad squid. 3
//                                 wolf moon officia aute, non cupidatat skateboard
//                                 dolor brunch. Food truck quinoa nesciunt laborum
//                                 eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
//                                 put a bird on it squid single-origin coffee
//                                 nulla assumenda shoreditch et. Nihil anim
//                                 keffiyeh helvetica, craft beer labore wes
//                                 anderson cred nesciunt sapiente ea proident. Ad
//                                 vegan excepteur butcher vice lomo. Leggings
//                                 occaecat craft beer farm-to-table, raw denim
//                                 aesthetic synth nesciunt you probably haven't
//                                 heard of them accusamus labore sustainable VHS.
//                               </div>
//                             </div>
//                           </div>
//                           <div
//                             className="card"
//                             style={{
//                               border: "none"
//                             }}
//                           >
//                             <div
//                               className="card-header"
//                               id="headingThree"
//                               style={heading}
//                             >
//                               <h5 className="mb-0">
//                                 <button
//                                   className="btn btn-link collapsed btn-block text-left"
//                                   type="button"
//                                   data-toggle="collapse"
//                                   data-target="#collapseThree"
//                                   aria-expanded="false"
//                                   aria-controls="collapseThree"
//                                 >
//                                   <i className="fa fa-chevron-down main" />
//                                   Where can I get some?
//                                 </button>
//                               </h5>
//                             </div>
//                             <div
//                               id="collapseThree"
//                               className="collapse fade"
//                               aria-labelledby="headingThree"
//                               data-parent="#accordionExample"
//                             >
//                               <div className="card-body">
//                                 Anim pariatur cliche reprehenderit, enim eiusmod
//                                 high life accusamus terry richardson ad squid. 3
//                                 wolf moon officia aute, non cupidatat skateboard
//                                 dolor brunch. Food truck quinoa nesciunt laborum
//                                 eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
//                                 put a bird on it squid single-origin coffee
//                                 nulla assumenda shoreditch et. Nihil anim
//                                 keffiyeh helvetica, craft beer labore wes
//                                 anderson cred nesciunt sapiente ea proident. Ad
//                                 vegan excepteur butcher vice lomo. Leggings
//                                 occaecat craft beer farm-to-table, raw denim
//                                 aesthetic synth nesciunt you probably haven't
//                                 heard of them accusamus labore sustainable VHS.
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </section>
//                 </div>
//               </div>
//             </div>
//             <div className="tab-pane" id="processFlow" role="tabpanel">
//               ...............2....................
//             </div>

//             <div className="tab-pane" id="privacy" role="tabpanel">
//               ...................3...............
//             </div>

//             <div className="tab-pane" id="uploadSize" role="tabpanel">
//               .....................4..............
//             </div>

//             <div className="tab-pane" id="management" role="tabpanel">
//               ......................5..............
//             </div>

//             </div>

//         </div>
//         <div>
//           <div className="faq_footer">
//           <Footer />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default FAQs;
import React, { Component } from "react";
import Navbar from "../NavBar/Navbar";
import Footer from "components/Footer/Footer";
import Bootstrap from "Bootstrap/bootstrap.module.css";
import "./faqs.css";

var heading = {
  backgroundColor: "#344466",
  borderRadius: "0",
  marginBottom: "1px",
  border: "none"
};

var customDisabled = {
  color: "white"
};

class FAQs extends Component {
  state = {
    tabname: "Walkthrough",
    label1: "Why Do we use Walkthrough  ?",
    label2: "Where Does it come from ?",
    label3: "Where can i get Some ?",
    content1:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
    content2:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
    content3:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
  };
  walkthrough = {
    tabname: "Walkthrough",
    label1: "Why Do we use Walkthrough ?",
    label2: "Where Does it come from ?",
    label3: "Where can i get Some ?",
    content1:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
    content2:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
    content3:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
  };
  ProcessFlow = {
    label1: "Why Do we use ProcessFlow ?",
    label2: "Where Does it come from ?",
    label3: "Where can i get Some ?",
    content1:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
    content2:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
    content3:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
  };
  Privacy = {
    tabname: "Privacy",
    label1: "Why Do we use Privacy ?",
    label2: "Where Does it come from ?",
    label3: "Where can i get Some ?",
    content1:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
    content2:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
    content3:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
  };
  Upload = {
    tabname: "UploadSize",
    label1: "Why Do we use Upload ?",
    label2: "Where Does it come from ?",
    label3: "Where can i get Some ?",
    content1:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
    content2:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
    content3:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
  };
  Management = {
    tabname: "Management",
    label1: "Why Do we use Management ?",
    label2: "Where Does it come from ?",
    label3: "Where can i get Some ?",
    content1:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
    content2:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
    content3:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboarddolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil animm keffiyeh helvetica, craft beer labore wes anderson put a bird on it squid single-origin coffee nulla assumenda shoreditch et. cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
  };
  change = (event, index) => {
    let elems = document.querySelectorAll("a.nav-link");
    for (let i = 0; i < elems.length; i++) {
      elems[i].className = elems[i].className.replace(" active show", "");
    }
    let elem = event.target;
    elem.className += " active show";

    if (index == 0) {
      this.setState(this.walkthrough);
    } else if (index == 1) {
      this.setState(this.ProcessFlow);
    } else if (index == 2) {
      this.setState(this.Privacy);
    } else if (index == 3) {
      this.setState(this.Upload);
    } else if (index == 4) {
      this.setState(this.Management);
    }
  };

  /* customAcc = (event, id) => {
    let elem = document.getElementById(id);
    alert(elem.getAttribute("aria-expanded"));
    if (elem.getAttribute("aria-expanded") == "true") {
      elem.setAttribute("disabled", "true");
      elem.style.color = "white";
      elem.style.opacity = "1";
    } else {
      let btnFaqs = document.getElementsByClassName("btn-faq");
      for (let i = 0; i < btnFaqs.length; i++) {
        console.log("PPPP", btnFaqs[i], "PPPP");
        btnFaqs[i].removeAttribute("disabled");
      }
    }
  }; */

  render() {
    return (
      <div>
        <Navbar />
        <div className="col-12 faq-wrapper" style={{ marginTop: "5%" }}>
          <h1 className="mb-4 text-center">
            FAQs
            <hr
              style={{
                width: "30px",
                height: "2px",
                color: "#987c46",
                backgroundColor: "#987c46",
                alignContent: "center",
                marginLeft: "49%"
              }}
            />
          </h1>
        </div>
        <div className="container" style={{ marginTop: "3%" }}>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active show"
                //data-toggle="tab"
                role="tab"
                style={{
                  paddingLeft: "40px",
                  fontSize: "16px",
                  marginBottom: "1px",
                  lineHeight: "1.7",
                  height: "60px"
                }}
                aria-controls="walkthrough"
                onClick={e => {
                  this.change(e, 0);
                }}
              >
                Walkthrough
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                onClick={e => {
                  this.change(e, 1);
                }}
                id="active_link"
                style={{
                  paddingLeft: "40px",
                  fontSize: "16px",
                  marginBottom: "1px",
                  lineHeight: "1.7",
                  height: "60px"
                }}
                role="tab"
                aria-controls="processFlow"
              >
                Process flow
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                onClick={e => {
                  this.change(e, 2);
                }}
                id="active_link"
                style={{
                  paddingLeft: "40px",
                  fontSize: "16px",
                  marginBottom: "1px",
                  lineHeight: "1.7",
                  height: "60px"
                }}
                role="tab"
                aria-controls="privacy"
              >
                Privacy
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                onClick={e => {
                  this.change(e, 3);
                }}
                id="active_link"
                style={{
                  paddingLeft: "40px",
                  fontSize: "16px",
                  marginBottom: "1px",
                  lineHeight: "1.7",
                  height: "60px"
                }}
                role="tab"
                aria-controls="uploadSize"
              >
                Upload Size
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                style={{
                  paddingLeft: "40px",
                  fontSize: "17px",
                  marginBottom: "1px",
                  lineHeight: "1.7",
                  height: "60px"
                }}
                onClick={e => {
                  this.change(e, 4);
                }}
                role="tab"
                aria-controls="management"
              >
                Management
              </a>
            </li>
          </ul>

          <div className="tab-content">
            <div className="tab-pane active" id="walkthrough" role="tabpanel">
              <div className="container-fluid bg-gray" id="accordion-style-1">
                <div className="container">
                  <section style={{ paddingTop: 0 }}>
                    <div className="row">
                      <div className="col-10 mx-auto">
                        <div
                          className="accordion"
                          id="accordionExample"
                          style={{
                            width: "100%"
                          }}
                        >
                          <div
                            className="card"
                            style={{
                              border: "none"
                            }}
                          >
                            <div
                              className="card-header"
                              id="headingOne"
                              style={heading}
                            >
                              <h5 className="mb-0">
                                <button
                                  id="collapse1"
                                  className="btn btn-link btn-block text-left btn-faq"
                                  type="button"
                                  data-toggle="collapse"
                                  data-target="#collapseOne"
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                // onClick={e => this.customAcc(e, "collapse1")}
                                >
                                  <i className="fa fa-angle-down main" />
                                  {this.state.label1}
                                </button>
                              </h5>
                            </div>

                            <div
                              id="collapseOne"
                              className="collapse show fade"
                              aria-labelledby="headingOne"
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                {this.state.content1}
                              </div>
                            </div>
                          </div>
                          <div
                            className="card"
                            style={{
                              border: "none"
                            }}
                          >
                            <div
                              className="card-header"
                              id="headingTwo"
                              style={heading}
                            >
                              <h5 className="mb-0">
                                <button
                                  id="collapse2"
                                  className="btn btn-link collapsed btn-block text-left btn-faq"
                                  type="button"
                                  data-toggle="collapse"
                                  data-target="#collapseTwo"
                                  aria-expanded="false"
                                  aria-controls="collapseTwo"
                                //  onClick={e => this.customAcc(e, "collapse2")}
                                >
                                  <i className="fa fa-angle-down main" />
                                  {this.state.label2}
                                </button>
                              </h5>
                            </div>
                            <div
                              id="collapseTwo"
                              className="collapse fade"
                              aria-labelledby="headingTwo"
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                {this.state.content2}
                              </div>
                            </div>
                          </div>
                          <div
                            className="card"
                            style={{
                              border: "none"
                            }}
                          >
                            <div
                              className="card-header"
                              id="headingThree"
                              style={heading}
                            >
                              <h5 className="mb-0">
                                <button
                                  id="collapse3"
                                  className="btn btn-link collapsed btn-block text-left btn-faq"
                                  type="button"
                                  data-toggle="collapse"
                                  data-target="#collapseThree"
                                  aria-expanded="false"
                                  aria-controls="collapseThree"
                                //  onClick={e => this.customAcc(e, "collapse3")}
                                >
                                  <i className="fa fa-angle-down main" />
                                  {this.state.label3}
                                </button>
                              </h5>
                            </div>
                            <div
                              id="collapseThree"
                              className="collapse fade"
                              aria-labelledby="headingThree"
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                {this.state.content3}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="faq_footer">
            <Footer history={this.props.history.location.pathname} />
          </div>
        </div>
      </div>
    );
  }
}

export default FAQs;
