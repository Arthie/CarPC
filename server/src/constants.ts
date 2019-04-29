export interface Modes {
  [keys: string]: ModeSettings
  dev: ModeSettings
  prod: ModeSettings
  raspberry: ModeSettings
}

export interface ModeSettings {
  MUSICFOLDER: string
  PYTHONSCRIPT: string
  OBDSERIALPORT: string
}

// todo: use envirement variables
const Settings: Modes = {
  dev: {
    MUSICFOLDER: "C:/Users/Arthie/Music/",
    PYTHONSCRIPT: "./test.py",
    OBDSERIALPORT: "COM5"
  },
  prod: {
    MUSICFOLDER: "C:/Users/Arthie/Music",
    PYTHONSCRIPT: "./obd2.py",
    OBDSERIALPORT: "COM7"
  },
  raspberry: {
    MUSICFOLDER: "C:/Users/Arthie/Music",
    PYTHONSCRIPT: "/utils/obd2.py",
    OBDSERIALPORT: "/dev/ttyUSB0"
  }
}

export default Settings
