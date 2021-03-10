#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { StepFnsStack } from '../lib/step-fns-stack';

const app = new cdk.App();
new StepFnsStack(app, 'StepFnsStack');
