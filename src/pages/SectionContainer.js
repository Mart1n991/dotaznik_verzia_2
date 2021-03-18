import React from "react";
import { Grid } from "@material-ui/core";

import PersonalInfo from "./PersonalInfo";
import Address from "./Address";
import Measurments from "./Measurments";
import Goals from "./Goals";
import Exercise from "./Exercise";
import Health from "./Health";
import LifeStyle from "./LifeStyle";
import AdditionalInfo from "./AdditionalInfo";
import Finish from "./Finish";

import { TOTAL_STEPS } from "../constans/steps";

import ButtonComponent from "../components/Button";

import { connect } from "react-redux";
import { stepForward, stepBack } from "../Actions/buttonControl";
import * as errorHandling from "../Actions/errorHandling";
import * as validations from "../validations";

function SectionContainer(props) {
  const onButtonNext = () => {
    //Validácia sekcie PersonalInfo
    props.step === 1 && validations.personalInfo(props.userPersonalInfo, props.stepForward, props.errorPersonalInfo);

    //Validácia sekcie Address
    props.step === 2 && validations.address(props.userAddress, props.stepForward, props.errorAddress);

    //Validácia sekcie Measurments
    props.step === 3 && validations.personalInfo(props.userMeasurments, props.stepForward, props.errorMeasurments);

    //Validácia sekcie Goals
    props.step === 4 && validations.goals(props.goals, props.stepForward, props.errorGoals);

    //Validácia sekcie Exercises
    props.step === 5 && validations.exercises(props.exercises, props.stepForward, props.errorExercises);

    //Validácia sekcie Lifestyle
    props.step === 6 && validations.lifestyle(props.lifestyle, props.stepForward, props.errorLifestyle);

    //Validácia sekcie Health
    props.step === 7 && validations.health(props.health, props.stepForward, props.errorHealth);

    props.step === 8 && props.stepForward();

    localStorage.setItem("user", JSON.stringify(props.user));
  };

  const onButtonBack = () => {
    return props.stepBack();
  };

  // Sem switchujem kroky v aplikácií na základe čísla kroku sa mi vyrenderuje daný obsah, ktorý potrebujem
  const renderContent = () => {
    switch (props.step) {
      case 2:
        return <Address />;
      case 3:
        return <Measurments />;
      case 4:
        return <Goals />;
      case 5:
        return <Exercise />;
      case 6:
        return <LifeStyle />;
      case 7:
        return <Health />;
      case 8:
        return <AdditionalInfo />;
      case 9:
        return <Finish />;

      default:
        return <PersonalInfo />;
    }
  };
  return (
    <>
      {renderContent()}

      <Grid container justify="center">
        {props.step === 1 ? (
          <ButtonComponent disabled color="primary">
            Späť
          </ButtonComponent>
        ) : (
          <ButtonComponent color="primary" onClick={onButtonBack}>
            Späť
          </ButtonComponent>
        )}

        {props.step === TOTAL_STEPS ? (
          <ButtonComponent color="secondary">Odoslať</ButtonComponent>
        ) : (
          <ButtonComponent color="secondary" onClick={onButtonNext}>
            Ďalej
          </ButtonComponent>
        )}
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state,
    step: state.step.currentStep,
    userPersonalInfo: state.personalInfo.data,
    userAddress: state.address.data,
    userMeasurments: state.measurments.data,
    goals: state.goals.data,
    exercises: state.exercise.data,
    lifestyle: state.lifestyle.data,
    health: state.health.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    stepForward: () => dispatch(stepForward()),
    stepBack: () => dispatch(stepBack()),
    errorPersonalInfo: (error) => dispatch(errorHandling.PersonalInfo(error)),
    errorAddress: (error) => dispatch(errorHandling.Address(error)),
    errorMeasurments: (error) => dispatch(errorHandling.Measurments(error)),
    errorGoals: (error) => dispatch(errorHandling.Goals(error)),
    errorExercises: (error) => dispatch(errorHandling.Exercises(error)),
    errorLifestyle: (error) => dispatch(errorHandling.lifestyle(error)),
    errorHealth: (error) => dispatch(errorHandling.health(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer);
