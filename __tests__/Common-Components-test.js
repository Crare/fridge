import React from 'react';
import { 
  Button,
  Card, 
  CardSection, 
  ConfirmModal, 
  CustomDatePicker,
  Header,
  Input,
  Spinner,
  TextLink,
  ToggleButton
  } from '../src/components/common';

import renderer from 'react-test-renderer';

test('renders correctly Button', () => {
  const tree = renderer.create(<Button>Test</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly Card', () => {
  const tree = renderer.create(<Card>Test</Card>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly CardSection', () => {
  const tree = renderer.create(<CardSection>Test</CardSection>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly ConfirmModal', () => {
  const tree = renderer.create(<ConfirmModal>Test</ConfirmModal>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly CustomDatePicker', () => {
  const tree = renderer.create(<CustomDatePicker date={new Date(1567415643221)}>Test</CustomDatePicker>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly Header', () => {
  const tree = renderer.create(<Header>Test</Header>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly Input', () => {
  const tree = renderer.create(<Input/>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly Spinner', () => {
  const tree = renderer.create(<Spinner />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly TextLink', () => {
  const tree = renderer.create(<TextLink>Test</TextLink>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly ToggleButton', () => {
  const tree = renderer.create(<ToggleButton>Test</ToggleButton>).toJSON();
  expect(tree).toMatchSnapshot();
});

