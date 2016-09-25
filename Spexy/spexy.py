import psutil
import cpuinfo
import time
import os
import platform
import json
import requests
from uuid import getnode as get_mac

netInfo = psutil.net_io_counters(pernic=False)
prevKBSent = netInfo.bytes_sent / 1024
prevKBRecv = netInfo.bytes_recv / 1024

sysinfo = {}
sysinfo["os"] = [os.name,platform.system()]
mac = get_mac()

while True:
    #CPU Info
    info = cpuinfo.get_cpu_info()
    sysinfo["cpuName"] = ("{0}".format(info["brand"]))

    sysinfo["cpuCoreInfo"] = {}
    cpuperc = psutil.cpu_percent(interval=1,percpu=True)
    for i in range(len(cpuperc)):
        sysinfo["cpuCoreInfo"]["core"+str(i)] = cpuperc[i]

    sysinfo["logpro"] = psutil.cpu_count(logical=True)
    sysinfo["phypro"] = psutil.cpu_count(logical=False)

    #Memory Info
    mem = psutil.virtual_memory()
    sysinfo["totmem"] = float("{0:.3f}".format((mem.total/(1024**3))))
    sysinfo["availmem"] = float("{0:.3f}".format((mem.available / (1024 ** 3))))
    sysinfo["permem"] = float("{0:.3f}".format(mem.percent))

    #Disk Usage Info
    disk = psutil.disk_partitions(all=False)
    diskIO = psutil.disk_io_counters(perdisk=False)

    for i in range(len(disk)):
        diskUsage = psutil.disk_usage(disk[i].device)
        sysinfo["disk" + str(i)] = {}
        sysinfo["disk" + str(i)]["device"] = disk[i].device
        sysinfo["disk" + str(i)]["mtpoint"] = disk[i].mountpoint
        sysinfo["disk" + str(i)]["fsystem"] = disk[i].fstype
        sysinfo["disk" + str(i)]["totspace"] = float("{0:.3f}".format(diskUsage.total / 1024 ** 3))
        sysinfo["disk" + str(i)]["usedspace"] = float("{0:.3f}".format(diskUsage.used / 1024 ** 3))
        sysinfo["disk" + str(i)]["freespace"] = float("{0:.3f}".format(diskUsage.free / 1024 ** 3))

    #Net Usage Info

    netInfo = psutil.net_io_counters(pernic=False)
    currentKBSent = netInfo.bytes_sent / 1024
    currentKBRecv = netInfo.bytes_recv / 1024
    sysinfo["KBsent"] = float("{0:.3f}".format(currentKBSent-prevKBSent))
    sysinfo["KBrecv"] = float("{0:.3f}".format(currentKBRecv-prevKBRecv))
    prevKBSent = currentKBSent
    prevKBRecv = currentKBRecv
    time.sleep(1)

    processes = []

    for proc in psutil.process_iter():
        processes.append({'name':str(proc.name)[str(proc.name).index("'")+1:str(proc.name).index(')')-1],'PID':proc.pid, 'memPerc':("{0:.3f}".format(proc.memory_percent(memtype="rss")))})

    print(json.dumps(sysinfo))
    print(json.dumps(processes))
    print("\n")

    try:
        payload = {'json_payload': json.dumps(sysinfo)}
        response = requests.post("http://nisarg.me:1337/sendinfo/" + "testmac",data=payload)
        payload = {'json_payload': json.dumps(processes)}
        response = requests.post("http://nisarg.me:1337/sendtasks/" + "testmac",data=payload)
    except:
        a = 10

