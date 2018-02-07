const dev = {
    MUSICFOLDER:"C:/Users/Arthie/Music",
    PYTHONSCRIPT:"/utils/test.py",
    OBDSERIALPORT:"COM5"
}

const prod = {
    MUSICFOLDER:"C:/Users/Arthie/Music",
    PYTHONSCRIPT:"/utils/obd2.py",
    OBDSERIALPORT:"COM5"
}

const raspberry = {
    MUSICFOLDER:"C:/Users/Arthie/Music",
    PYTHONSCRIPT:"/utils/obd2.py",
    OBDSERIALPORT:"/dev/ttyUSB0"
}

module.exports = { dev, prod, raspberry }