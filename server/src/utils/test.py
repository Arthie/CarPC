import sys
import time

def log(input):
    print(input,flush=True)
    

def main():
    temp = 0
    temp2 = 1000
    while 1:
        log('{"speed": "' + str(temp) + '"}')
        log('{"rpm": "' + str(temp2) + '"}')
        if temp >= 200:
            temp = 0
            temp2 = 0
        else:
            temp = temp + 1
            temp2 = temp2 + 28
        time.sleep(0.05)
    sys.exit("Python script stopped")


# start process
if __name__ == '__main__':
    main()
