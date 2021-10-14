/* eslint-disable react/no-children-prop */
import React, {memo} from 'react';
import ReactDatePicker, {utils, Day} from 'react-modern-calendar-datepicker';
import * as UI from '@chakra-ui/react';
import {isEmpty} from 'lodash';
import {AiOutlineCalendar} from 'react-icons/ai';

export interface IDatePicker {
  isMinimumTodayDate?: boolean;
  minimumDate?: Day;
  maximumDate?: Day;
  value?: Day;
  onChange?: (date: Day) => void;
}

function DatePicker(props: IDatePicker) {
  const {isMinimumTodayDate, minimumDate, maximumDate, value, onChange} = props;
  const renderCustomInput = ({ref}) => (
    <UI.InputGroup>
      <UI.Input
        readOnly
        ref={ref}
        placeholder="Select a day"
        value={
          isEmpty(value)
            ? undefined
            : `${value?.day}/${value?.month}/${value?.year}`
        }
      />
      <UI.InputRightElement children={<AiOutlineCalendar fontSize="20px" />} />
    </UI.InputGroup>
  );
  return (
    <ReactDatePicker
      renderInput={renderCustomInput}
      value={value}
      onChange={onChange}
      shouldHighlightWeekends
      //@ts-ignore
      minimumDate={isMinimumTodayDate ? utils().getToday() : minimumDate}
      maximumDate={maximumDate}
    />
  );
}

export default memo(DatePicker);
