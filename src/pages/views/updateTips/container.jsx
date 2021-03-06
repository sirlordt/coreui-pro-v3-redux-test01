import React, {
  Component
} from "react";

import {
  withRouter
} from "react-router-dom";

import {
  connect
} from "react-redux";

//import classNames from "classnames";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  //CContainer,
  CLabel,
  CForm,
  CFormGroup,
  CInput,
  CSelect,
  CInputGroup,
  CInvalidFeedback,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  //CTextarea,
  CProgress
  //CInputGroupAppend
} from "@coreui/react";

import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";

import {
  Trans,
  withTranslation
} from "react-i18next";

import PropTypes from "prop-types";

import {
  login,
  showModal
} from "../../../redux/actions";

import SystemUtils from "../../../utils/systemUtils";
import BackendClient from "../../../services/backendClient";

const propTypes = {

  children: PropTypes.node

};

const defaultProps = {};

let intervalHandler = null;

class UpdateTipView extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4(),
      establishments: [],

      selectedEstablishmentIsInvalid: false,
      selectedEstablishmentMessage: "",
      selectedEstablishment: "",
      selectedDateIsInvalid: false,
      selectedDateMessage: "",
      selectedDate: "",
      fileToUploadIsInvalid: false,
      fileToUploadLabel: "Choose file",
      fileToUploadMessage: "",
      fileToUpload: "",
      uploadProgressLabel: "",
      uploadProgress: 0,
      processStatusLabel: "",
      processStatusProgress: 0,
      jobId: ""

    };

  }

  async componentDidMount() {

    try {

      const result = await BackendClient.callGetEstablishment( this.props.authentication.accounts[ this.props.authentication.active ].Authorization, null );

      if ( result instanceof Error === false ) {

        this.setState( {

          establishments: result,
          selectedEstablishment: result[ 0 ].id

        } );

      }
      else {

        console.log( result );

      }

    }
    catch ( error ) {

      console.log( error );

    }

  }

  componentWillUnmount() {

    if ( intervalHandler ) {

      clearInterval( intervalHandler );

    }

  }

  onChange = ( event ) => {

    console.log( event );

    this.setState( {

      [ event.target.name ]: event.target.value

    } );

    if ( event.target.name === "selectedEstablishment" ) {

      this.setState( () => ( {

        selectedEstablishmentIsInvalid: false,
        selectedEstablishmentMessage: ""

      } ) );

    }
    else if ( event.target.name === "selectedDate" ) {

      this.setState( () => ( {

        selectedDateIsInvalid: false,
        selectedDateMessage: ""

      } ) );

    }

  };

  onChangeFileToUpload = ( event ) => {

    //console.log( event.target.files[ 0 ] );

    this.setState( {

      fileToUploadIsInvalid: false,
      fileToUploadMessage: "",
      [ event.target.name ]: event.target.files[ 0 ],
      fileToUploadLabel: event.target.files[ 0 ].name,
      uploadProgressLabel: "",
      uploadProgress: 0,
      processStatusLabel: "",
      processStatusProgress: 0

    } );

  };

  uploadCallback = ( progressEvent ) => {

    const uploadProgressPercent = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total );

    this.setState( {

      uploadProgress: uploadProgressPercent

    } );

  }

  buttonProcessHandler = async ( event ) => {

    event && event.preventDefault();

    try {

      const t = this.props.t; //Translate functions injected by withTranslation function

      const bselectedEstablishmentIsInvalid = !!( !this.state.selectedEstablishment || this.state.selectedEstablishment.trim() === "" );
      const bSelectedDateIsInvalid = !!( !this.state.selectedDate || this.state.selectedDate.trim() === "" );
      const bFileToUploadIsInvalid = !this.state.fileToUpload;

      if ( bselectedEstablishmentIsInvalid ||
           bSelectedDateIsInvalid ||
           bFileToUploadIsInvalid ) {

        this.setState( {

          selectedEstablishmentIsInvalid: bselectedEstablishmentIsInvalid,
          selectedEstablishmentMessage: bselectedEstablishmentIsInvalid ? t( "Establishment field is required" ) : "",
          selectedDateIsInvalid: bSelectedDateIsInvalid,
          selectedDateMessage: bSelectedDateIsInvalid ? t( "Date field is required" ) : "",
          fileToUploadIsInvalid: bFileToUploadIsInvalid,
          fileToUploadMessage: bFileToUploadIsInvalid ? t( "File field is required" ) : ""

        } );

      }
      else {

        const uploadResponse = await BackendClient.callUploadFile( this.props.authentication.accounts[ this.props.authentication.active ].Authorization,
                                                                   this.state.fileToUpload,
                                                                   this.uploadCallback,
                                                                   null );

        const jobId = await BackendClient.callStartUpdateTipJob( this.props.authentication.accounts[ this.props.authentication.active ].Authorization,
                                                                 {
                                                                   Id: uploadResponse.Id,
                                                                   Date: this.state.selectedDate,
                                                                   EstablishmentId: this.state.selectedEstablishment,
                                                                   Path: uploadResponse.Path
                                                                 },
                                                                 null );

        this.setState( () => ( {
          uploadProgressLabel: `${t( "Uploading file" )}...`,
          jobId
        } ) );

        //console.log( jobId );

        intervalHandler = setInterval( async () => {

          const statusResponse = await BackendClient.callGetUpdateTipJobStatus( this.props.authentication.accounts[ this.props.authentication.active ].Authorization,
                                                                                {
                                                                                  Id: jobId,
                                                                                  Output: "status"
                                                                                },
                                                                                null );

          if ( statusResponse instanceof Error === false ) {

            this.setState( {

              processStatusLabel: statusResponse.Status,
              processStatusProgress: statusResponse.Total > 0 ? Math.round( ( statusResponse.Progress * 100 ) / statusResponse.Total ) : 0

            } );

          }
          else {

            clearInterval( intervalHandler );

          }

        }, 1000 );

        /*
        const auth = await BackendClient.callCreateBinaryAuth( this.props.authentication.accounts[ this.props.authentication.active ].Authorization );

        if ( auth instanceof String ) {

          //

        }
        */

      }

    }
    catch ( error ) {

      console.log( error );

    }

  }

  render() {

    //const innerHeight = window.innerHeight;
    //console.log(  );

    //const t = this.props.t; //Translate functions injected by withTranslation function
    //<CContainer style={ { "height": innerHeight - 212, "overflowY": "auto" } }>
    //<div style={ { flex: 1, overflow: "auto", background: "pink" } }>

    return (

      <CRow className="justify-content-center my-4">

        <CCol md="5">

          <CCardGroup>

            <CCard className="p-4">

              <CCardBody className="p-0">

                <CForm>

                  <CFormGroup className="mb-0">

                    <h1>

                      <Trans i18nKey="Update Tips" />

                    </h1>

                  </CFormGroup>

                  <CFormGroup className="mb-2">

                    <CLabel htmlFor="establishment">

                      <Trans i18nKey="Establishment" />

                    </CLabel>

                    <CInputGroup>

                      <CInputGroupPrepend>

                        <CInputGroupText>

                          <FontAwesomeIcon icon="building" />

                        </CInputGroupText>

                      </CInputGroupPrepend>

                      <CSelect
                        custom
                        invalid={ this.state.selectedEstablishmentIsInvalid }
                        className="box-shadow-none"
                        name="selectedEstablishment"
                        id="selectedEstablishment"
                        onChange={ this.onChange }
                        value={ this.state.selectedEstablishment }
                      >

                        {

                          this.state.establishments.map( ( establishmentInfo ) => {

                            return (

                              <option key={ establishmentInfo.id } value={ establishmentInfo.id }>{ establishmentInfo.first_name }</option>

                            );

                          } )

                        }

                      </CSelect>

                      {

                        this.state.selectedEstablishmentMessage ? (

                          <CInvalidFeedback className="custom-invalid-feedback">

                            { this.state.selectedEstablishmentMessage ? this.state.selectedEstablishmentMessage : "" }

                          </CInvalidFeedback>

                        ) : null

                      }

                    </CInputGroup>

                  </CFormGroup>

                  <CFormGroup className="mb-2">

                    <CLabel htmlFor="date">

                      <Trans i18nKey="Date" />

                    </CLabel>

                    <CInputGroup>

                      <CInputGroupPrepend>

                        <CInputGroupText>

                          <FontAwesomeIcon icon={ [ "far", "calendar" ] } />

                        </CInputGroupText>

                      </CInputGroupPrepend>

                      <CInput
                        invalid={ this.state.selectedDateIsInvalid }
                        className="box-shadow-none"
                        type="date"
                        id="selectedDate"
                        name="selectedDate"
                        placeholder="date"
                        onChange={ this.onChange }
                      />

                    </CInputGroup>

                    {

                      this.state.selectedDateMessage ? (

                        <CInvalidFeedback className="custom-invalid-feedback">

                          { this.state.selectedDateMessage }

                        </CInvalidFeedback>

                      ) : null

                    }

                  </CFormGroup>

                  <CFormGroup className="mb-2">

                    <CLabel htmlFor="fileToUpload">

                      <Trans i18nKey="File" />

                    </CLabel>

                    <CInputGroup>

                      <CInputGroupPrepend>

                        <CInputGroupText className="width-38_25px">

                          <FontAwesomeIcon icon="file-excel" />

                        </CInputGroupText>

                      </CInputGroupPrepend>

                      <div className="custom-file">

                        <CInput
                          invalid={ this.state.fileToUploadIsInvalid }
                          type="file"
                          className="custom-file-input box-shadow-none"
                          id="fileToUpload"
                          name="fileToUpload"
                          onChange={ this.onChangeFileToUpload } />

                        <CLabel className="custom-file-label">

                          <Trans i18nKey={ this.state.fileToUploadLabel } />

                        </CLabel>

                      </div>

                    </CInputGroup>

                    {

                      this.state.fileToUploadMessage ? (

                        <CInvalidFeedback className="custom-invalid-feedback">

                          { this.state.fileToUploadMessage }

                        </CInvalidFeedback>

                      ) : null

                    }

                  </CFormGroup>

                  <CFormGroup className="mb-2">

                    <CLabel>

                      { this.state.uploadProgressLabel || "..." }

                    </CLabel>

                    <CProgress
                      animated
                      color="success"
                      value={ this.state.uploadProgress }
                      max={ 100 }
                      showPercentage
                      className=""
                      style={ {
                        height: "13px"
                      } } />

                  </CFormGroup>

                  <CFormGroup className="mb-4">

                    <CLabel>

                      { this.state.processStatusLabel || "..." }

                    </CLabel>

                    <CProgress
                      animated
                      color="success"
                      value={ this.state.processStatusProgress }
                      max={ 100 }
                      showPercentage
                      className=""
                      style={ {
                        height: "13px"
                      } } />

                  </CFormGroup>

                  <CFormGroup className="mb-2">

                    <CButton
                      id="buttonProcess"
                      disabled={ this.state.buttonLoginDisabled }
                      className="w-100 box-shadow-none"
                      color="primary"
                      onClick={ this.buttonProcessHandler }>

                      <FontAwesomeIcon icon="cogs" />

                      <span className="px-2 m-0">

                        <Trans i18nKey="Process" />

                      </span>

                    </CButton>

                  </CFormGroup>

                </CForm>

                {/*
                <CTextarea
                  className="box-shadow-none"
                  name="process-output"
                  id="process-output"
                  rows="15"
                  placeholder="Process output come here..."
                />
                */}

              </CCardBody>

            </CCard>

          </CCardGroup>

        </CCol>

      </CRow>

    );

  }

}

UpdateTipView.propTypes = propTypes;
UpdateTipView.defaultProps = defaultProps;

const mapDispatchToProps = {
  login,
  showModal
};

const mapStateToProps = ( state ) => {

  return {

    authentication: state.authentication,
    frontend: state.frontend

  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( UpdateTipView );

export default withRouter( withTranslation()( connectedComponent ) );
