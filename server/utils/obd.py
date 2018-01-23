# docs: http://python-obd.readthedocs.io/en/latest/
import sys
import time
import obd
from obd import OBDStatus


def log(string):
    print(string)
    sys.stdout.flush()


def new_speed(r):
    log('{"SPEED":"' + str(r.value.magnitude) + '"}')


def new_rpm(r):
    log('{"RPM":"' + str(r.value.magnitude) + '"}')


def main():
    obd.logger.setLevel(obd.logging.DEBUG) # enables all debug information

    ports = obd.scan_serial()  # return list of valid USB or RF ports
    log("Ports:" + str(ports))

    connection = obd.Async(portstr="COM5", baudrate=38400,
                           protocol=None, fast=False)
    speed = obd.commands['SPEED']
    rpm = obd.commands['RPM']
    log("-Connection status"+connection.status())
    log("-Protocol id/name:" + connection.protocol_id() +
        "/" + connection.protocol_name())
    log("-Port:" + connection.port_name())
    log("-ELM voltage:" + str(obd.commands['ELM_VERSION']))
    log("-ELM voltage:" + str(obd.commands['ELM_VOLTAGE']))
    log("-Support speed:" + str(connection.supports(speed)))
    log("-Support RPM:" + str(connection.supports(rpm)))
    log("-Internal cmd speed:" + str(obd.commands.has_command(speed)))
    log("-Internal cmd rpm:" + str(obd.commands.has_command(rpm)))

    connection.watch(speed, callback=new_speed, force=False)
    connection.watch(rpm, callback=new_rpm, force=False)

    connection.start()
    while 1:
        if not connection.is_connected():
            connection.stop()
            unwatch_all()
            connection.close()
            sys.exit("Python script stopped")
        time.sleep(0.3)


# start process
if __name__ == '__main__':
    main()
