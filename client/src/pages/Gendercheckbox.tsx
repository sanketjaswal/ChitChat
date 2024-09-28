import * as React from 'react';
import { styled } from 'styled-components';

interface GenderCheckboxProps {
  onCheckBoxChange: (gender: string) => void;
  selectedGender: string;
}

const GenderContainer = styled.div`
  display: flex;
  /* color: white; */
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const FormControl = styled.div`
  display: flex;
  align-items: center;
`;

interface LabelProps {
  selected: boolean;
}

const Label = styled.label<LabelProps>`
  display: flex;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  background-color: ${({ selected }) => (selected ? '#d1d5db' : 'transparent')};
  color: ${({ selected }) => (selected ? 'black' : 'white')};
  transition: 0.2s ease-in-out;
  &:hover {
    border: 1px solid white;
    transition: 0.2s;
  }
`;

const LabelText = styled.span`
  font-size: 1rem;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  border: 2px solid #334155; /* Slate-900 */
  cursor: pointer;
  display: none;
`;

const GenderCheckbox: React.FC<GenderCheckboxProps> = ({
  onCheckBoxChange,
  selectedGender,
}) => {
  return (
    <GenderContainer>
      <FormControl>
        <Label selected={selectedGender === 'male'}>
          <LabelText>Male</LabelText>
          <Checkbox
            type="checkbox"
            checked={selectedGender === 'male'}
            onChange={() => onCheckBoxChange('male')}
          />
        </Label>
      </FormControl>
      <FormControl>
        <Label selected={selectedGender === 'female'}>
          <LabelText>Female</LabelText>
          <Checkbox
            type="checkbox"
            checked={selectedGender === 'female'}
            onChange={() => onCheckBoxChange('female')}
          />
        </Label>
      </FormControl>
    </GenderContainer>
  );
};

export default GenderCheckbox;
