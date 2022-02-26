import os
import subprocess
import sys

from util import run

os.environ["MACH_USE_SYSTEM_PYTHON"] = "1"
os.environ["MOZ_SOURCE_CHANGESET"] = subprocess.getoutput("git rev-parse HEAD")

run("./melon build")