import { take, call, put, fork } from 'redux-saga/effects';
import requestApi from 'utils/requestApi';
import * as constants from '../../constants';
import * as actions from '../../actions';
import { HOST, DEFAULT_MODULE } from 'config';
import { browserHistory } from 'react-router';
import path from 'path';
import lodash from 'lodash';
import { calculateSectionsStatus } from 'services/completionStatusService';
import toastr from "utils/toastr";
import {ISP_WORKFLOW_STATUS} from 'utils/constants';
import getMetadataFromCache from 'services/metadataServices';



