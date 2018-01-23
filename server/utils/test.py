import sys
import time

def log(input):
    print(input)
    sys.stdout.flush()

def main():
    temp = 0
    temp2 = 1000
    while 1:
        log('{' +
              '"SPEED": "' + str(temp) + '",' +
              '"RPM": "' + str(temp2) + '"' +
              '}')
        if temp >= 200:
            temp = 0
            temp2 = 0
        else:
            temp = temp + 1
            temp2 = temp2 + 28
        time.sleep(0.1)
    sys.exit("Python script stopped")


# start process
if __name__ == '__main__':
    main()
