from setuptools import setup

setup(name='spexy',
	version = '1.0',
	description = 'Remote monitoring and control program',
	install_requires = ['psutil','cpuinfo','time','os','platform','json'],
	zip_safe=False)
