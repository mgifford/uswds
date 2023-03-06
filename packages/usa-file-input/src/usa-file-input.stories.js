import Component from "./usa-file-input.twig";
import {
  DefaultContent,
  ErrorContent,
  MultipleContent,
  SpecificContent,
  WildcardContent,
} from "./content";

export default {
  title: "Components/Form Inputs/File Input",
  argTypes: {
    disabled_state: {
      name: "Disabled state",
      control: { type: "radio" },
      options: ["none", "disabled", "aria-disabled"],
      defaultValue: "none",
    },
  },
};

const Template = (args) => Component(args);

export const Default = Template.bind({});
Default.args = DefaultContent;

export const Error = Template.bind({});
Error.args = ErrorContent;

export const Multiple = Template.bind({});
Multiple.args = MultipleContent;

export const Specific = Template.bind({});
Specific.args = SpecificContent;

export const Wildcard = Template.bind({});
Wildcard.args = WildcardContent;

export const Disabled = Template.bind({});
Disabled.args = {
  ...DefaultContent,
  disabled_state: "disabled",
};

export const AriaDisabled = Template.bind({});
AriaDisabled.args = {
  ...DefaultContent,
  disabled_state: "aria-disabled",
};
