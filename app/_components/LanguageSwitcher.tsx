import * as React from "react";
import Button from "@mui/material/Button";
import Cookies from "js-cookie"
import { useI18n } from "../_providers/I18nProvider"
import { useColorScheme } from "@mui/material";
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';


export default function LanguageSwitcher() {
  const { lang, dicts } = useI18n()
  const idx = dicts.indexOf(lang)
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(idx);
  const { mode } = useColorScheme();
  const isDark = mode === "dark";
  const handleLanguageChange = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    if (index == idx) {
      setOpen(false);
      return
    }
    setSelectedIndex(index);
    const newLang = dicts[index];
    Cookies.set("language", newLang, { path: "/" });
    window.location.reload();
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };


  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
        sx={{
          cursor: `pointer`,
          border: `none`,
          boxShadow: `none`,
        }}
        onClick={handleToggle}
      >
        <Button variant="text" disabled sx={{
          color: `var(--mui-palette-text-primary) !important`,
          background: `var(${isDark ? "--mui-palette-secondary-dark" : "--mui-palette-primary-light"}) !important`,
          border: `2px solid var(${isDark ? "--mui-palette-secondary-light" : "--mui-palette-secondary-dark"}) !important`,
          padding: `0 0.8rem`,
          boxShadow: `none`,
        }}
        >{dicts[idx].split(`-`)[0].trim()}</Button>
        <Button
          sx={{
            background: `var(${isDark ? "--mui-palette-secondary-light" : "--mui-palette-secondary-dark"}) !important`,
            boxShadow: `none`,
            color: `var(${isDark ? "--mui-palette-secondary-dark" : "--mui-palette-secondary-light"}) !important`,
            border: `none`,
            padding: `0`
          }}
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1, paddingTop: `7px`, width: `100px`, borderRadius: "var(--mui-shape-borderRadius)" }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{
            transformOrigin:
              placement === 'bottom' ? 'center top' : 'center bottom',
          }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem sx={{ padding: `1rem 0` }}>
                  {dicts.map((option, index) => (
                    <MenuItem
                      sx={{ padding: `0.1rem 1rem` }}
                      key={option}
                      disabled={index === selectedIndex}
                      selected={index === selectedIndex}
                      onClick={(event) => handleLanguageChange(event, index)}
                    >
                      {option.split(`-`)[0].trim().toUpperCase()}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
