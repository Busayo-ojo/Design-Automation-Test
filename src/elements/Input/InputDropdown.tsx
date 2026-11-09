import React, { useState, useRef, useEffect, useId } from 'react';
import type { ReactNode } from 'react';
import './InputDropdown.css';
import { Icon } from '../../foundations/icons';
import { Avatar } from '../Avatar';

export type InputDropdownType = 'default' | 'icon leading' | 'avatar leading' | 'status';
export type InputDropdownState = 'default' | 'hover' | 'active' | 'filled' | 'disabled';
export type InputDropdownSize = 'sm' | 'lg';

export interface InputDropdownItem {
  id?: string | number;
  value?: string | number;
  label: ReactNode;
  sublabel?: ReactNode;
  icon?: ReactNode;
  avatarUrl?: string;
  statusColor?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface InputDropdownProps {
  /** Variant type matching Figma Dropdown / Selectors: 'default', 'icon leading', 'avatar leading', 'status' */
  type?: InputDropdownType;
  /** Visual state matching Figma: 'default', 'hover', 'active', 'filled', 'disabled' */
  state?: InputDropdownState;
  /** Size variant: sm (36px) or lg (56px) */
  size?: InputDropdownSize;
  /** Whether the dropdown menu is open */
  extended?: boolean;
  /** Field label rendered above selector */
  label?: string;
  /** Show/hide label */
  hasLabel?: boolean;
  /** Helper text rendered below selector */
  helperText?: string;
  /** Show/hide helper text */
  hasHelperText?: boolean;
  /** Placeholder text shown when no value is selected */
  placeholder?: string;
  /** Controlled selected value */
  value?: string | number;
  /** Default selected value */
  defaultValue?: string | number;
  /** Callback fired when an option is selected */
  onChange?: (value: string | number, item?: InputDropdownItem) => void;
  /** List of dropdown options */
  options?: InputDropdownItem[];
  /** Leading icon override for 'icon leading' type */
  leadingIcon?: ReactNode;
  /** Avatar image URL for 'avatar leading' type */
  avatarUrl?: string;
  /** Status color override for 'status' type */
  statusColor?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Input name for forms */
  name?: string;
  /** Unique id for label pairing */
  id?: string;
}

export const InputDropdown: React.FC<InputDropdownProps> = ({
  type = 'default',
  state: stateProp,
  size = 'lg',
  extended,
  label = 'Label',
  hasLabel = true,
  helperText = 'Helper text',
  hasHelperText = false,
  placeholder = 'Placeholder',
  value: controlledValue,
  defaultValue,
  onChange,
  options = [],
  leadingIcon,
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
  statusColor = '#04802E',
  disabled = false,
  className = '',
  style,
  name,
  id,
}) => {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlledValue = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string | number | undefined>(defaultValue);
  const selectedValue = isControlledValue ? controlledValue : internalValue;

  const isControlledOpen = extended !== undefined;
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isControlledOpen ? Boolean(extended) : internalIsOpen;

  const selectedOption = options.find(
    (opt) => (opt.value ?? opt.id) === selectedValue
  );

  const isDisabled = disabled || stateProp === 'disabled';
  const isFilled = stateProp === 'filled' || (Boolean(selectedValue) && stateProp !== 'default');
  const isHover = stateProp === 'hover';
  const isActive = stateProp === 'active' || isOpen;

  const derivedState: InputDropdownState = isDisabled
    ? 'disabled'
    : isActive
    ? 'active'
    : isHover
    ? 'hover'
    : isFilled
    ? 'filled'
    : 'default';

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (!isControlledOpen) {
          setInternalIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isControlledOpen]);

  const handleToggle = () => {
    if (isDisabled) return;
    if (!isControlledOpen) {
      setInternalIsOpen(!isOpen);
    }
  };

  const handleSelectOption = (item: InputDropdownItem) => {
    if (item.disabled || isDisabled) return;
    const optValue = item.value ?? item.id;
    if (!isControlledValue && optValue !== undefined) {
      setInternalValue(optValue);
    }
    if (optValue !== undefined) {
      onChange?.(optValue, item);
    }
    item.onClick?.();
    if (!isControlledOpen) {
      setInternalIsOpen(false);
    }
  };

  const renderLeadingVisual = () => {
    if (type === 'icon leading') {
      return (
        <span className="fmdqui-input-dropdown__leading-icon">
          {leadingIcon ?? <Icon name="search" variant="linear" size={20} />}
        </span>
      );
    }
    if (type === 'avatar leading') {
      return (
        <span className="fmdqui-input-dropdown__avatar">
          <Avatar size="xs" type="Image" imageUrl={avatarUrl} />
        </span>
      );
    }
    if (type === 'status') {
      return (
        <span
          className="fmdqui-input-dropdown__status-dot"
          style={{ backgroundColor: statusColor }}
        />
      );
    }
    return null;
  };

  const displayText = selectedOption?.label ?? (derivedState === 'filled' ? 'Input' : placeholder);
  const isDisplayingPlaceholder = !selectedOption && derivedState !== 'filled';

  const containerClasses = [
    'fmdqui-input-dropdown-field',
    `fmdqui-input-dropdown-field--${size}`,
    `fmdqui-input-dropdown-field--${type.replace(' ', '-')}`,
    `fmdqui-input-dropdown-field--state-${derivedState}`,
    className,
  ].filter(Boolean).join(' ');

  const selectorClasses = [
    'fmdqui-input-dropdown__selector',
    `fmdqui-input-dropdown__selector--${size}`,
    isOpen ? 'is-open' : '',
    isDisabled ? 'is-disabled' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} ref={containerRef} style={style}>
      {hasLabel && (
        <label htmlFor={fieldId} className="fmdqui-input-dropdown__label">
          {label}
        </label>
      )}

      <div
        id={fieldId}
        className={selectorClasses}
        onClick={handleToggle}
        role="combobox"
        tabIndex={isDisabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-disabled={isDisabled}
      >
        <div className="fmdqui-input-dropdown__selector-left">
          {renderLeadingVisual()}
          <span
            className={`fmdqui-input-dropdown__selector-text ${
              isDisplayingPlaceholder ? 'is-placeholder' : 'is-filled'
            }`}
          >
            {displayText}
          </span>
        </div>

        <div className="fmdqui-input-dropdown__selector-right">
          <Icon name="chevron-down" variant="linear" size={18} className="fmdqui-input-dropdown__chevron" />
        </div>
      </div>

      {name && (
        <input
          type="hidden"
          name={name}
          value={selectedValue !== undefined ? String(selectedValue) : ''}
          disabled={isDisabled}
        />
      )}

      {hasHelperText && (
        <span className="fmdqui-input-dropdown__helper-text">{helperText}</span>
      )}

      {isOpen && options.length > 0 && (
        <div className="fmdqui-input-dropdown__menu">
          <ul className="fmdqui-input-dropdown__list" role="listbox">
            {options.map((item, index) => {
              const itemKey = item.id ?? item.value ?? index;
              const isSelected = (item.value ?? item.id) === selectedValue;
              return (
                <li
                  key={itemKey}
                  role="option"
                  aria-selected={isSelected}
                  className={`fmdqui-input-dropdown__item ${item.disabled ? 'is-disabled' : ''} ${
                    isSelected ? 'is-selected' : ''
                  }`}
                  onClick={() => handleSelectOption(item)}
                >
                  {item.icon && <span className="fmdqui-input-dropdown__item-icon">{item.icon}</span>}
                  {item.avatarUrl && (
                    <span className="fmdqui-input-dropdown__item-avatar">
                      <Avatar size="xs" type="Image" imageUrl={item.avatarUrl} />
                    </span>
                  )}
                  {item.statusColor && (
                    <span
                      className="fmdqui-input-dropdown__status-dot"
                      style={{ backgroundColor: item.statusColor }}
                    />
                  )}
                  <div className="fmdqui-input-dropdown__item-texts">
                    <span className="fmdqui-input-dropdown__item-label">{item.label}</span>
                    {item.sublabel && (
                      <span className="fmdqui-input-dropdown__item-sublabel">{item.sublabel}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
InputDropdown.displayName = 'InputDropdown';
