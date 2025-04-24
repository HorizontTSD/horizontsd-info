import * as React from "react";
import Cookies from "js-cookie"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useColorScheme } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Button from "@mui/material/Button";
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import { useI18n } from "@/app/_providers/I18nProvider"

export default function LanguageSwitcher() {
  const { lang, dicts } = useI18n()
  const idx = Math.max(dicts.indexOf(lang), 0)
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
          border: `none`,
          boxShadow: `none`,
          cursor: `pointer`,
        }}
        onClick={handleToggle}
      >
        <Button variant="text" disabled sx={{
          background: `var(${isDark ? "--mui-palette-secondary-dark" : "--mui-palette-primary-light"}) !important`,
          border: `2px solid var(${isDark ? "--mui-palette-secondary-light" : "--mui-palette-secondary-dark"}) !important`,
          boxShadow: `none`,
          color: `var(--mui-palette-text-primary) !important`,
          padding: `0 0.8rem`,
        }}
        >{dicts[idx].split(`-`)[0].trim()}</Button>
        <Button
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="menu"
          aria-label="select merge strategy"
          size="small"
          sx={{
            background: `var(${isDark ? "--mui-palette-secondary-light" : "--mui-palette-secondary-dark"}) !important`,
            border: `none`,
            boxShadow: `none`,
            color: `var(${isDark ? "--mui-palette-secondary-dark" : "--mui-palette-secondary-light"}) !important`,
            padding: `0`
          }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        anchorEl={anchorRef.current}
        disablePortal
        open={open}
        role={undefined}
        sx={{
          borderRadius: "var(--mui-shape-borderRadius)",
          paddingTop: `7px`,
          width: `100px`,
          zIndex: 1,
        }}
        transition
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
                      disabled={index === selectedIndex}
                      key={option}
                      onClick={(event) => handleLanguageChange(event, index)}
                      selected={index === selectedIndex}
                      sx={{ padding: `0.1rem 1rem` }}
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
